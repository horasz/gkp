-- Database GKP Jemaat Tanjung Barat (MySQL / MariaDB)
-- Import lewat phpMyAdmin: tab Import, pilih file ini.

CREATE DATABASE IF NOT EXISTS gkp_tanjung_barat
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gkp_tanjung_barat;

-- Pendaftaran jemaat (terhubung ke form di sections/daftar.html)
CREATE TABLE IF NOT EXISTS jemaat (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama        VARCHAR(120) NOT NULL,
  telepon     VARCHAR(20)  NOT NULL,
  email       VARCHAR(120) NULL,
  alamat      TEXT         NULL,
  status      ENUM('baru','dihubungi','terdaftar') NOT NULL DEFAULT 'baru',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- Jadwal ibadah (opsional, untuk dipakai kalau jadwal ingin dinamis)
CREATE TABLE IF NOT EXISTS jadwal_ibadah (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama        VARCHAR(120) NOT NULL,
  hari        ENUM('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu') NOT NULL,
  jam_mulai   TIME NOT NULL,
  jam_selesai TIME NULL,
  keterangan  VARCHAR(255) NULL,
  aktif       TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Renungan harian (opsional)
CREATE TABLE IF NOT EXISTS renungan (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tanggal     DATE NOT NULL UNIQUE,
  judul       VARCHAR(200) NOT NULL,
  ayat        VARCHAR(120) NULL,
  isi         TEXT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
