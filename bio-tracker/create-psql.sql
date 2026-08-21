

--
SET client_encoding TO 'UTF8';


\set ON_ERROR_STOP OFF




DROP ROLE IF EXISTS biotracker_role;

\set ON_ERROR_STOP ON

CREATE ROLE biotracker_role with nosuperuser nocreatedb nocreaterole inherit noreplication;
CREATE ROLE biotrackerdbuser with nosuperuser nocreatedb nocreaterole inherit login password '{{SAINCEPACS_DB_PASSWORD}}' in role biotracker_role noreplication;


\c biotracker


-- TABLES AND SEQUENCES
--
CREATE SEQUENCE log_seq INCREMENT 1 MINVALUE 1 NO MAXVALUE START 1 CACHE 1;
GRANT ALL ON SEQUENCE log_seq TO biotrackeradmin;
REVOKE ALL ON SEQUENCE log_seq FROM PUBLIC;
GRANT USAGE, SELECT ON SEQUENCE log_seq TO biotracker_role;

CREATE TABLE log (
    log_id integer DEFAULT nextval('log_seq'::regclass) NOT NULL PRIMARY KEY,
    a_pain integer DEFAULT 0,
    g_pain integer DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    walk_miles integer DEFAULT 0,
    swim_minutes integer DEFAULT 0,
    elliptical_minutes integer DEFAULT 0,
    sitting_minutes integer DEFAULT 0,
    sleep_hours integer DEFAULT 0,
    drive_time integer DEFAULT 0,
    naps_minutes integer DEFAULT 0,
    sex_type CHAR(12) DEFAULT 'N',
    stress_level CHAR(12) DEFAULT 'LOW',
    bm integer DEFAULT 0,
    bm_type CHAR(12) default '',
    HEP_type CHAR(12) DEFAULT 'CORE'
);

GRANT ALL ON log TO biotrackeradmin;
GRANT SELECT, INSERT, UPDATE, DELETE ON log TO biotracker_role;


