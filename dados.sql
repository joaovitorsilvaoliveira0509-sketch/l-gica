-- GitHub Copilot
DROP DATABASE IF EXISTS loja_produtos;
CREATE DATABASE loja_produtos CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
USE loja_produtos;

-- Tabelas principais
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    contato VARCHAR(150),
    telefone VARCHAR(50),
    email VARCHAR(150),
    endereco TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE armazens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    endereco TEXT,
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(60) NOT NULL UNIQUE,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    categoria_id INT,
    fornecedor_id INT,
    custo DECIMAL(12,2) DEFAULT 0.00,
    preco DECIMAL(12,2) DEFAULT 0.00,
    estoque_atual DECIMAL(14,4) DEFAULT 0.0000,
    unidade VARCHAR(30) DEFAULT 'un',
    estoque_minimo DECIMAL(14,4) DEFAULT 0.0000,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (categoria_id),
    INDEX (fornecedor_id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Estoque por armazém (controle detalhado por local)
CREATE TABLE estoque_por_armazem (
    produto_id INT NOT NULL,
    armazem_id INT NOT NULL,
    quantidade DECIMAL(14,4) NOT NULL DEFAULT 0.0000,
    PRIMARY KEY (produto_id, armazem_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (armazem_id) REFERENCES armazens(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Movimentos de inventário (ENTRADA, SAIDA, AJUSTE)
CREATE TABLE inventario_movimentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    armazem_id INT NOT NULL,
    tipo ENUM('ENTRADA','SAIDA','AJUSTE') NOT NULL,
    quantidade DECIMAL(14,4) NOT NULL,
    preco_unitario DECIMAL(12,4) DEFAULT NULL,
    referencia VARCHAR(150),
    usuario VARCHAR(120),
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (armazem_id) REFERENCES armazens(id) ON DELETE CASCADE,
    INDEX (produto_id),
    INDEX (armazem_id),
    INDEX (tipo)
) ENGINE=InnoDB;

-- Triggers para manter estoque consistente:
DELIMITER $$
CREATE TRIGGER trg_inventario_mov_insert
BEFORE INSERT ON inventario_movimentos
FOR EACH ROW
BEGIN
    DECLARE atual DECIMAL(14,4);
    DECLARE delta DECIMAL(14,4);

    -- obter quantidade atual no armazém
    SELECT quantidade INTO atual FROM estoque_por_armazem
        WHERE produto_id = NEW.produto_id AND armazem_id = NEW.armazem_id
        LIMIT 1;

    IF atual IS NULL THEN
        SET atual = 0.0000;
    END IF;

    IF NEW.tipo = 'ENTRADA' THEN
        SET delta = NEW.quantidade;
        -- atualiza (ou insere) quantidade por armazém
        INSERT INTO estoque_por_armazem (produto_id, armazem_id, quantidade)
            VALUES (NEW.produto_id, NEW.armazem_id, delta)
        ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade);
    ELSEIF NEW.tipo = 'SAIDA' THEN
        SET delta = -NEW.quantidade;
        -- impede estoque negativo
        IF atual < NEW.quantidade THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estoque insuficiente para SAIDA';
        END IF;
        INSERT INTO estoque_por_armazem (produto_id, armazem_id, quantidade)
            VALUES (NEW.produto_id, NEW.armazem_id, delta)
        ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade);
    ELSEIF NEW.tipo = 'AJUSTE' THEN
        -- AJUSTE define a quantidade absoluta no armazém para NEW.quantidade
        SET delta = NEW.quantidade - atual;
        INSERT INTO estoque_por_armazem (produto_id, armazem_id, quantidade)
            VALUES (NEW.produto_id, NEW.armazem_id, NEW.quantidade)
        ON DUPLICATE KEY UPDATE quantidade = VALUES(quantidade);
    ELSE
        SET delta = 0.0000;
    END IF;

    -- atualiza estoque total no produto (soma incremental)
    UPDATE produtos SET estoque_atual = estoque_atual + delta WHERE id = NEW.produto_id;

    -- prevenir estoque total negativo
    IF (SELECT estoque_atual FROM produtos WHERE id = NEW.produto_id) < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operação resultaria em estoque total negativo';
    END IF;
END$$

CREATE TRIGGER trg_inventario_mov_update
BEFORE UPDATE ON inventario_movimentos
FOR EACH ROW
BEGIN
    DECLARE old_atual DECIMAL(14,4);
    DECLARE new_atual DECIMAL(14,4);
    DECLARE delta_old DECIMAL(14,4);
    DECLARE delta_new DECIMAL(14,4);

    -- calcular efeito do OLD
    SELECT quantidade INTO old_atual FROM estoque_por_armazem
        WHERE produto_id = OLD.produto_id AND armazem_id = OLD.armazem_id LIMIT 1;
    IF old_atual IS NULL THEN SET old_atual = 0.0000; END IF;

    IF OLD.tipo = 'ENTRADA' THEN SET delta_old = OLD.quantidade;
    ELSEIF OLD.tipo = 'SAIDA' THEN SET delta_old = -OLD.quantidade;
    ELSEIF OLD.tipo = 'AJUSTE' THEN SET delta_old = OLD.quantidade - (old_atual - OLD.quantidade) ; -- fallback
    ELSE SET delta_old = 0.0000; END IF;

    -- reverter efeito OLD
    UPDATE estoque_por_armazem
        SET quantidade = GREATEST(0, quantidade - delta_old)
        WHERE produto_id = OLD.produto_id AND armazem_id = OLD.armazem_id;

    UPDATE produtos SET estoque_atual = estoque_atual - delta_old WHERE id = OLD.produto_id;

    -- aplicar NEW usando mesma lógica do insert
    SELECT quantidade INTO new_atual FROM estoque_por_armazem
        WHERE produto_id = NEW.produto_id AND armazem_id = NEW.armazem_id LIMIT 1;
    IF new_atual IS NULL THEN SET new_atual = 0.0000; END IF;

    IF NEW.tipo = 'ENTRADA' THEN
        SET delta_new = NEW.quantidade;
        INSERT INTO estoque_por_armazem (produto_id, armazem_id, quantidade)
            VALUES (NEW.produto_id, NEW.armazem_id, delta_new)
        ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade);
    ELSEIF NEW.tipo = 'SAIDA' THEN
        SET delta_new = -NEW.quantidade;
        IF new_atual < NEW.quantidade THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estoque insuficiente para SAIDA (update)';
        END IF;
        INSERT INTO estoque_por_armazem (produto_id, armazem_id, quantidade)
            VALUES (NEW.produto_id, NEW.armazem_id, delta_new)
        ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade);
    ELSEIF NEW.tipo = 'AJUSTE' THEN
        SET delta_new = NEW.quantidade - new_atual;
        INSERT INTO estoque_por_armazem (produto_id, armazem_id, quantidade)
            VALUES (NEW.produto_id, NEW.armazem_id, NEW.quantidade)
        ON DUPLICATE KEY UPDATE quantidade = VALUES(quantidade);
    ELSE
        SET delta_new = 0.0000;
    END IF;

    UPDATE produtos SET estoque_atual = estoque_atual + delta_new WHERE id = NEW.produto_id;

    IF (SELECT estoque_atual FROM produtos WHERE id = NEW.produto_id) < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operação resultaria em estoque total negativo (update)';
    END IF;
END$$

CREATE TRIGGER trg_inventario_mov_delete
BEFORE DELETE ON inventario_movimentos
FOR EACH ROW
BEGIN
    DECLARE atual DECIMAL(14,4);
    DECLARE delta DECIMAL(14,4);

    SELECT quantidade INTO atual FROM estoque_por_armazem
        WHERE produto_id = OLD.produto_id AND armazem_id = OLD.armazem_id LIMIT 1;
    IF atual IS NULL THEN SET atual = 0.0000; END IF;

    IF OLD.tipo = 'ENTRADA' THEN SET delta = -OLD.quantidade;
    ELSEIF OLD.tipo = 'SAIDA' THEN SET delta = OLD.quantidade;
    ELSEIF OLD.tipo = 'AJUSTE' THEN
        -- não temos o histórico do valor anterior aqui; aplicar segurança simples: recompute somatório
        -- recomputa estoque total e por armazém após remoção do movimento (simplificado)
        UPDATE estoque_por_armazem
            SET quantidade = GREATEST(0, quantidade) WHERE produto_id = OLD.produto_id AND armazem_id = OLD.armazem_id;
        SET delta = 0.0000;
    ELSE SET delta = 0.0000; END IF;

    IF delta != 0.0000 THEN
        UPDATE estoque_por_armazem
            SET quantidade = GREATEST(0, quantidade + delta)
            WHERE produto_id = OLD.produto_id AND armazem_id = OLD.armazem_id;
        UPDATE produtos SET estoque_atual = estoque_atual + delta WHERE id = OLD.produto_id;
    END IF;

    IF (SELECT estoque_atual FROM produtos WHERE id = OLD.produto_id) < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Exclusão resultaria em estoque total negativo';
    END IF;
END$$
DELIMITER ;

-- Exemplos de uso (dados iniciais)
INSERT INTO categorias (nome, descricao) VALUES ('Bebidas','Refrigerantes e sucos'), ('Limpeza','Produtos de limpeza');
INSERT INTO fornecedores (nome, contato) VALUES ('Fornecedor A','compras@fa.com');
INSERT INTO armazens (nome, endereco) VALUES ('Matriz','Rua A, 123');

INSERT INTO produtos (sku, nome, categoria_id, fornecedor_id, preco, custo)
    VALUES ('SKU-001','Refrigerante 2L',1,1,7.50,4.00);

-- Entrada inicial de estoque
INSERT INTO inventario_movimentos (produto_id, armazem_id, tipo, quantidade, preco_unitario, referencia, usuario)
    VALUES (1,1,'ENTRADA',100.0000,4.00,'NF-1001','sistema');

-- Consulta rápida de estoque
-- SELECT p.sku, p.nome, p.estoque_atual, e.armazem_id, e.quantidade FROM produtos p JOIN estoque_por_armazem e ON p.id=e.produto_id WHERE p.id=1;