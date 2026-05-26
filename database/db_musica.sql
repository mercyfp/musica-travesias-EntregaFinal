--
-- PostgreSQL database dump
--



-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-07 14:58:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16440)
-- Name: albumes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.albumes (
    id_album integer NOT NULL,
    titulo_album character varying(80) NOT NULL,
    fecha_lanzamiento_album date,
    estado_album boolean DEFAULT true,
    portada_album_url text,
    id_artista_fk integer
);


ALTER TABLE public.albumes OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16439)
-- Name: albumes_id_album_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.albumes_id_album_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.albumes_id_album_seq OWNER TO postgres;

--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 225
-- Name: albumes_id_album_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.albumes_id_album_seq OWNED BY public.albumes.id_album;


--
-- TOC entry 224 (class 1259 OID 16424)
-- Name: artistas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artistas (
    id_artista integer NOT NULL,
    nombre_artista character varying(80) NOT NULL,
    biografia_artista text,
    foto_perfil_url_artista text,
    id_persona_fk integer
);


ALTER TABLE public.artistas OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16423)
-- Name: artistas_id_artista_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artistas_id_artista_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artistas_id_artista_seq OWNER TO postgres;

--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 223
-- Name: artistas_id_artista_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artistas_id_artista_seq OWNED BY public.artistas.id_artista;


--
-- TOC entry 228 (class 1259 OID 16457)
-- Name: canciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.canciones (
    id_cancion integer NOT NULL,
    titulo_cancion character varying(100) NOT NULL,
    duracion_cancion integer,
    archivo_url_cancion character varying(255),
    peso_archivo_cancion numeric(10,2),
    estado_cancion boolean DEFAULT true,
    id_album_fk integer,
    portada_url text,
    descripcion text,
    tipo_contenido character varying(30),
    comunidad character varying(80),
    categoria character varying(50),
    total_reproducciones integer DEFAULT 0,
    total_descargas integer DEFAULT 0,
    megusta integer DEFAULT 0, -- AQUÍ AGREGAMOS LA COLUMNA
    es_destacado boolean DEFAULT false,
    fecha_publicacion date DEFAULT CURRENT_DATE,
);


ALTER TABLE public.canciones OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16456)
-- Name: canciones_id_cancion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.canciones_id_cancion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.canciones_id_cancion_seq OWNER TO postgres;

--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 227
-- Name: canciones_id_cancion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.canciones_id_cancion_seq OWNED BY public.canciones.id_cancion;


--
-- TOC entry 235 (class 1259 OID 16535)
-- Name: descargas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.descargas (
    id_descarga integer NOT NULL,
    id_usuario_fk integer,
    id_cancion_fk integer,
    fecha_descarga timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado_descarga character varying(20) DEFAULT 'pendiente'::character varying,
    tamanio_mb numeric(10,2),
    CONSTRAINT descargas_estado_descarga_check CHECK (((estado_descarga)::text = ANY ((ARRAY['pendiente'::character varying, 'descargado'::character varying, 'error'::character varying])::text[])))
);


ALTER TABLE public.descargas OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16534)
-- Name: descargas_id_descarga_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.descargas_id_descarga_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.descargas_id_descarga_seq OWNER TO postgres;

--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 234
-- Name: descargas_id_descarga_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.descargas_id_descarga_seq OWNED BY public.descargas.id_descarga;


--
-- TOC entry 245 (class 1259 OID 16634)
-- Name: estadisticas_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estadisticas_usuario (
    id_estadistica integer NOT NULL,
    id_usuario_fk integer,
    historias_escuchadas integer DEFAULT 0,
    tiempo_total_segundos integer DEFAULT 0,
    logros integer DEFAULT 0,
    racha_dias integer DEFAULT 0,
    nivel_actual character varying(50) DEFAULT 'Buscador'::character varying,
    proximo_nivel character varying(50) DEFAULT 'Guardián'::character varying,
    progreso_mes numeric(5,2) DEFAULT 0
);


ALTER TABLE public.estadisticas_usuario OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 16633)
-- Name: estadisticas_usuario_id_estadistica_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estadisticas_usuario_id_estadistica_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estadisticas_usuario_id_estadistica_seq OWNER TO postgres;

--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 244
-- Name: estadisticas_usuario_id_estadistica_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estadisticas_usuario_id_estadistica_seq OWNED BY public.estadisticas_usuario.id_estadistica;


--
-- TOC entry 237 (class 1259 OID 16556)
-- Name: favoritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritos (
    id_favorito integer NOT NULL,
    id_usuario_fk integer,
    id_cancion_fk integer,
    fecha_guardado timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favoritos OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16555)
-- Name: favoritos_id_favorito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favoritos_id_favorito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favoritos_id_favorito_seq OWNER TO postgres;

--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 236
-- Name: favoritos_id_favorito_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favoritos_id_favorito_seq OWNED BY public.favoritos.id_favorito;


--
-- TOC entry 233 (class 1259 OID 16514)
-- Name: historial_reproduccion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_reproduccion (
    id_historial integer NOT NULL,
    id_usuario_fk integer,
    id_cancion_fk integer,
    fecha_reproduccion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tiempo_escuchado_segundos integer DEFAULT 0,
    completada boolean DEFAULT false
);


ALTER TABLE public.historial_reproduccion OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16513)
-- Name: historial_reproduccion_id_historial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_reproduccion_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_reproduccion_id_historial_seq OWNER TO postgres;

--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 232
-- Name: historial_reproduccion_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_reproduccion_id_historial_seq OWNED BY public.historial_reproduccion.id_historial;


--
-- TOC entry 239 (class 1259 OID 16577)
-- Name: mensajes_chat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensajes_chat (
    id_mensaje integer NOT NULL,
    usuario_id integer,
    mensaje text NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mensajes_chat OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16576)
-- Name: mensajes_chat_id_mensaje_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_chat_id_mensaje_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_chat_id_mensaje_seq OWNER TO postgres;

--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 238
-- Name: mensajes_chat_id_mensaje_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_chat_id_mensaje_seq OWNED BY public.mensajes_chat.id_mensaje;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: persona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persona (
    id_persona integer NOT NULL,
    nombre_persona character varying(80) NOT NULL,
    apellido_persona character varying(80),
    identificacion_persona bigint,
    celular_persona bigint,
    genero_persona character varying(20),
    estado_persona boolean DEFAULT true,
    fecha_nacimiento date
);


ALTER TABLE public.persona OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: persona_id_persona_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.persona_id_persona_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.persona_id_persona_seq OWNER TO postgres;

--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 219
-- Name: persona_id_persona_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.persona_id_persona_seq OWNED BY public.persona.id_persona;


--
-- TOC entry 231 (class 1259 OID 16495)
-- Name: playlist_canciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlist_canciones (
    id_playlist_fk integer NOT NULL,
    id_cancion_fk integer NOT NULL,
    orden_cancion integer,
    fecha_agregada timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.playlist_canciones OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16478)
-- Name: playlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlists (
    id_playlist integer NOT NULL,
    nombre_playlist character varying(80) NOT NULL,
    descripcion_playlist text,
    estado_playlist boolean DEFAULT true,
    id_usuario_fk integer,
    portada_playlist_url text,
    tipo_playlist character varying(50),
    es_favoritos boolean DEFAULT false
);


ALTER TABLE public.playlists OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16477)
-- Name: playlists_id_playlist_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.playlists_id_playlist_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.playlists_id_playlist_seq OWNER TO postgres;

--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 229
-- Name: playlists_id_playlist_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.playlists_id_playlist_seq OWNED BY public.playlists.id_playlist;


--
-- TOC entry 241 (class 1259 OID 16594)
-- Name: solicitudes_canciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitudes_canciones (
    id_solicitud integer NOT NULL,
    usuario_id integer,
    cancion_id integer, 
    cancion_sugerida character varying(150), 
    artista_sugerido character varying(150), 
    mensaje text, 
    semana_programacion character varying(15), 
    estado character varying(20) DEFAULT 'pendiente'::character varying,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.solicitudes_canciones OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16593)
-- Name: solicitudes_canciones_id_solicitud_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitudes_canciones_id_solicitud_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitudes_canciones_id_solicitud_seq OWNER TO postgres;

--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 240
-- Name: solicitudes_canciones_id_solicitud_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitudes_canciones_id_solicitud_seq OWNED BY public.solicitudes_canciones.id_solicitud;


--
-- TOC entry 243 (class 1259 OID 16617)
-- Name: transmision; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transmision (
    id_transmision integer NOT NULL,
    url_stream text,
    cancion_actual_id integer,
    activa boolean DEFAULT true,
    actualizada_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transmision OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16616)
-- Name: transmision_id_transmision_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transmision_id_transmision_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transmision_id_transmision_seq OWNER TO postgres;

--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 242
-- Name: transmision_id_transmision_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transmision_id_transmision_seq OWNED BY public.transmision.id_transmision;


--
-- TOC entry 222 (class 1259 OID 16400)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(50) NOT NULL,
    email_usuario character varying(100) NOT NULL,
    fecha_registro_usuario date DEFAULT CURRENT_DATE,
    id_persona_fk integer,
    password_hash text NOT NULL,
    foto_perfil_url text,
    modo_oscuro boolean DEFAULT false,
    descargar_solo_wifi boolean DEFAULT true,
    modo_offline boolean DEFAULT false
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16399)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4827 (class 2604 OID 16443)
-- Name: albumes id_album; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albumes ALTER COLUMN id_album SET DEFAULT nextval('public.albumes_id_album_seq'::regclass);


--
-- TOC entry 4826 (class 2604 OID 16427)
-- Name: artistas id_artista; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artistas ALTER COLUMN id_artista SET DEFAULT nextval('public.artistas_id_artista_seq'::regclass);


--
-- TOC entry 4829 (class 2604 OID 16460)
-- Name: canciones id_cancion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canciones ALTER COLUMN id_cancion SET DEFAULT nextval('public.canciones_id_cancion_seq'::regclass);


--
-- TOC entry 4843 (class 2604 OID 16538)
-- Name: descargas id_descarga; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.descargas ALTER COLUMN id_descarga SET DEFAULT nextval('public.descargas_id_descarga_seq'::regclass);


--
-- TOC entry 4856 (class 2604 OID 16637)
-- Name: estadisticas_usuario id_estadistica; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_usuario ALTER COLUMN id_estadistica SET DEFAULT nextval('public.estadisticas_usuario_id_estadistica_seq'::regclass);


--
-- TOC entry 4846 (class 2604 OID 16559)
-- Name: favoritos id_favorito; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos ALTER COLUMN id_favorito SET DEFAULT nextval('public.favoritos_id_favorito_seq'::regclass);


--
-- TOC entry 4839 (class 2604 OID 16517)
-- Name: historial_reproduccion id_historial; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reproduccion ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_reproduccion_id_historial_seq'::regclass);


--
-- TOC entry 4848 (class 2604 OID 16580)
-- Name: mensajes_chat id_mensaje; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes_chat ALTER COLUMN id_mensaje SET DEFAULT nextval('public.mensajes_chat_id_mensaje_seq'::regclass);


--
-- TOC entry 4819 (class 2604 OID 16393)
-- Name: persona id_persona; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona ALTER COLUMN id_persona SET DEFAULT nextval('public.persona_id_persona_seq'::regclass);


--
-- TOC entry 4835 (class 2604 OID 16481)
-- Name: playlists id_playlist; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists ALTER COLUMN id_playlist SET DEFAULT nextval('public.playlists_id_playlist_seq'::regclass);


--
-- TOC entry 4850 (class 2604 OID 16597)
-- Name: solicitudes_canciones id_solicitud; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_canciones ALTER COLUMN id_solicitud SET DEFAULT nextval('public.solicitudes_canciones_id_solicitud_seq'::regclass);


--
-- TOC entry 4853 (class 2604 OID 16620)
-- Name: transmision id_transmision; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transmision ALTER COLUMN id_transmision SET DEFAULT nextval('public.transmision_id_transmision_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 16403)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 5072 (class 0 OID 16440)
-- Dependencies: 226
-- Data for Name: albumes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.albumes (id_album, titulo_album, fecha_lanzamiento_album, estado_album, portada_album_url, id_artista_fk) FROM stdin;



--
-- TOC entry 5070 (class 0 OID 16424)
-- Dependencies: 224
-- Data for Name: artistas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artistas (id_artista, nombre_artista, biografia_artista, foto_perfil_url_artista, id_persona_fk) FROM stdin;



--
-- TOC entry 5074 (class 0 OID 16457)
-- Dependencies: 228
-- Data for Name: canciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.canciones (id_cancion, titulo_cancion, duracion_cancion, archivo_url_cancion, peso_archivo_cancion, estado_cancion, id_album_fk, portada_url, descripcion, tipo_contenido, comunidad, categoria, total_reproducciones, total_descargas, es_destacado, fecha_publicacion) FROM stdin;



--
-- TOC entry 5081 (class 0 OID 16535)
-- Dependencies: 235
-- Data for Name: descargas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.descargas (id_descarga, id_usuario_fk, id_cancion_fk, fecha_descarga, estado_descarga, tamanio_mb) FROM stdin;



--
-- TOC entry 5091 (class 0 OID 16634)
-- Dependencies: 245
-- Data for Name: estadisticas_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estadisticas_usuario (id_estadistica, id_usuario_fk, historias_escuchadas, tiempo_total_segundos, logros, racha_dias, nivel_actual, proximo_nivel, progreso_mes) FROM stdin;



--
-- TOC entry 5083 (class 0 OID 16556)
-- Dependencies: 237
-- Data for Name: favoritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoritos (id_favorito, id_usuario_fk, id_cancion_fk, fecha_guardado) FROM stdin;



--
-- TOC entry 5079 (class 0 OID 16514)
-- Dependencies: 233
-- Data for Name: historial_reproduccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial_reproduccion (id_historial, id_usuario_fk, id_cancion_fk, fecha_reproduccion, tiempo_escuchado_segundos, completada) FROM stdin;



--
-- TOC entry 5085 (class 0 OID 16577)
-- Dependencies: 239
-- Data for Name: mensajes_chat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensajes_chat (id_mensaje, usuario_id, mensaje, fecha) FROM stdin;


--
-- TOC entry 5066 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: persona; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.persona (id_persona, nombre_persona, apellido_persona, identificacion_persona, celular_persona, genero_persona, estado_persona, fecha_nacimiento) FROM stdin;



--
-- TOC entry 5077 (class 0 OID 16495)
-- Dependencies: 231
-- Data for Name: playlist_canciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlist_canciones (id_playlist_fk, id_cancion_fk, orden_cancion, fecha_agregada) FROM stdin;



--
-- TOC entry 5076 (class 0 OID 16478)
-- Dependencies: 230
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlists (id_playlist, nombre_playlist, descripcion_playlist, estado_playlist, id_usuario_fk, portada_playlist_url, tipo_playlist, es_favoritos) FROM stdin;



--
-- TOC entry 5087 (class 0 OID 16594)
-- Dependencies: 241
-- Data for Name: solicitudes_canciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitudes_canciones (id_solicitud, usuario_id, cancion_id, mensaje, estado, fecha) FROM stdin;



--
-- TOC entry 5089 (class 0 OID 16617)
-- Dependencies: 243
-- Data for Name: transmision; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transmision (id_transmision, url_stream, cancion_actual_id, activa, actualizada_en) FROM stdin;



--
-- TOC entry 5068 (class 0 OID 16400)
-- Dependencies: 222
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre_usuario, email_usuario, fecha_registro_usuario, id_persona_fk, password_hash, foto_perfil_url, modo_oscuro, descargar_solo_wifi, modo_offline) FROM stdin;



--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 225
-- Name: albumes_id_album_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.albumes_id_album_seq', 1, false);


--
-- TOC entry 5111 (class 0 OID 0)
-- Dependencies: 223
-- Name: artistas_id_artista_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artistas_id_artista_seq', 1, false);


--
-- TOC entry 5112 (class 0 OID 0)
-- Dependencies: 227
-- Name: canciones_id_cancion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.canciones_id_cancion_seq', 1, false);


--
-- TOC entry 5113 (class 0 OID 0)
-- Dependencies: 234
-- Name: descargas_id_descarga_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.descargas_id_descarga_seq', 1, false);


--
-- TOC entry 5114 (class 0 OID 0)
-- Dependencies: 244
-- Name: estadisticas_usuario_id_estadistica_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estadisticas_usuario_id_estadistica_seq', 1, false);


--
-- TOC entry 5115 (class 0 OID 0)
-- Dependencies: 236
-- Name: favoritos_id_favorito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favoritos_id_favorito_seq', 1, false);


--
-- TOC entry 5116 (class 0 OID 0)
-- Dependencies: 232
-- Name: historial_reproduccion_id_historial_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historial_reproduccion_id_historial_seq', 1, false);


--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 238
-- Name: mensajes_chat_id_mensaje_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajes_chat_id_mensaje_seq', 1, false);


--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 219
-- Name: persona_id_persona_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.persona_id_persona_seq', 1, false);


--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 229
-- Name: playlists_id_playlist_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.playlists_id_playlist_seq', 1, false);


--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 240
-- Name: solicitudes_canciones_id_solicitud_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_canciones_id_solicitud_seq', 1, false);


--
-- TOC entry 5121 (class 0 OID 0)
-- Dependencies: 242
-- Name: transmision_id_transmision_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transmision_id_transmision_seq', 1, false);


--
-- TOC entry 5122 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, false);


--
-- TOC entry 4875 (class 2606 OID 16450)
-- Name: albumes albumes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albumes
    ADD CONSTRAINT albumes_pkey PRIMARY KEY (id_album);


--
-- TOC entry 4873 (class 2606 OID 16433)
-- Name: artistas artistas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artistas
    ADD CONSTRAINT artistas_pkey PRIMARY KEY (id_artista);


--
-- TOC entry 4877 (class 2606 OID 16471)
-- Name: canciones canciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canciones
    ADD CONSTRAINT canciones_pkey PRIMARY KEY (id_cancion);


--
-- TOC entry 4885 (class 2606 OID 16544)
-- Name: descargas descargas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.descargas
    ADD CONSTRAINT descargas_pkey PRIMARY KEY (id_descarga);


--
-- TOC entry 4897 (class 2606 OID 16649)
-- Name: estadisticas_usuario estadisticas_usuario_id_usuario_fk_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_usuario
    ADD CONSTRAINT estadisticas_usuario_id_usuario_fk_key UNIQUE (id_usuario_fk);


--
-- TOC entry 4899 (class 2606 OID 16647)
-- Name: estadisticas_usuario estadisticas_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_usuario
    ADD CONSTRAINT estadisticas_usuario_pkey PRIMARY KEY (id_estadistica);


--
-- TOC entry 4887 (class 2606 OID 16565)
-- Name: favoritos favoritos_id_usuario_fk_id_cancion_fk_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_usuario_fk_id_cancion_fk_key UNIQUE (id_usuario_fk, id_cancion_fk);


--
-- TOC entry 4889 (class 2606 OID 16563)
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id_favorito);


--
-- TOC entry 4883 (class 2606 OID 16523)
-- Name: historial_reproduccion historial_reproduccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reproduccion
    ADD CONSTRAINT historial_reproduccion_pkey PRIMARY KEY (id_historial);


--
-- TOC entry 4891 (class 2606 OID 16587)
-- Name: mensajes_chat mensajes_chat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes_chat
    ADD CONSTRAINT mensajes_chat_pkey PRIMARY KEY (id_mensaje);


--
-- TOC entry 4867 (class 2606 OID 16398)
-- Name: persona persona_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_pkey PRIMARY KEY (id_persona);


--
-- TOC entry 4881 (class 2606 OID 16502)
-- Name: playlist_canciones playlist_canciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_canciones
    ADD CONSTRAINT playlist_canciones_pkey PRIMARY KEY (id_playlist_fk, id_cancion_fk);


--
-- TOC entry 4879 (class 2606 OID 16489)
-- Name: playlists playlists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (id_playlist);


--
-- TOC entry 4893 (class 2606 OID 16605)
-- Name: solicitudes_canciones solicitudes_canciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_canciones
    ADD CONSTRAINT solicitudes_canciones_pkey PRIMARY KEY (id_solicitud);


--
-- TOC entry 4895 (class 2606 OID 16627)
-- Name: transmision transmision_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transmision
    ADD CONSTRAINT transmision_pkey PRIMARY KEY (id_transmision);


--
-- TOC entry 4869 (class 2606 OID 16417)
-- Name: usuarios usuarios_email_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_usuario_key UNIQUE (email_usuario);


--
-- TOC entry 4871 (class 2606 OID 16415)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4902 (class 2606 OID 16451)
-- Name: albumes albumes_id_artista_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albumes
    ADD CONSTRAINT albumes_id_artista_fk_fkey FOREIGN KEY (id_artista_fk) REFERENCES public.artistas(id_artista);


--
-- TOC entry 4901 (class 2606 OID 16434)
-- Name: artistas artistas_id_persona_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artistas
    ADD CONSTRAINT artistas_id_persona_fk_fkey FOREIGN KEY (id_persona_fk) REFERENCES public.persona(id_persona);


--
-- TOC entry 4903 (class 2606 OID 16472)
-- Name: canciones canciones_id_album_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canciones
    ADD CONSTRAINT canciones_id_album_fk_fkey FOREIGN KEY (id_album_fk) REFERENCES public.albumes(id_album);


--
-- TOC entry 4909 (class 2606 OID 16550)
-- Name: descargas descargas_id_cancion_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.descargas
    ADD CONSTRAINT descargas_id_cancion_fk_fkey FOREIGN KEY (id_cancion_fk) REFERENCES public.canciones(id_cancion);


--
-- TOC entry 4910 (class 2606 OID 16545)
-- Name: descargas descargas_id_usuario_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.descargas
    ADD CONSTRAINT descargas_id_usuario_fk_fkey FOREIGN KEY (id_usuario_fk) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4917 (class 2606 OID 16650)
-- Name: estadisticas_usuario estadisticas_usuario_id_usuario_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estadisticas_usuario
    ADD CONSTRAINT estadisticas_usuario_id_usuario_fk_fkey FOREIGN KEY (id_usuario_fk) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4911 (class 2606 OID 16571)
-- Name: favoritos favoritos_id_cancion_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_cancion_fk_fkey FOREIGN KEY (id_cancion_fk) REFERENCES public.canciones(id_cancion);


--
-- TOC entry 4912 (class 2606 OID 16566)
-- Name: favoritos favoritos_id_usuario_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_usuario_fk_fkey FOREIGN KEY (id_usuario_fk) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4907 (class 2606 OID 16529)
-- Name: historial_reproduccion historial_reproduccion_id_cancion_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reproduccion
    ADD CONSTRAINT historial_reproduccion_id_cancion_fk_fkey FOREIGN KEY (id_cancion_fk) REFERENCES public.canciones(id_cancion);


--
-- TOC entry 4908 (class 2606 OID 16524)
-- Name: historial_reproduccion historial_reproduccion_id_usuario_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_reproduccion
    ADD CONSTRAINT historial_reproduccion_id_usuario_fk_fkey FOREIGN KEY (id_usuario_fk) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4913 (class 2606 OID 16588)
-- Name: mensajes_chat mensajes_chat_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes_chat
    ADD CONSTRAINT mensajes_chat_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4905 (class 2606 OID 16508)
-- Name: playlist_canciones playlist_canciones_id_cancion_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_canciones
    ADD CONSTRAINT playlist_canciones_id_cancion_fk_fkey FOREIGN KEY (id_cancion_fk) REFERENCES public.canciones(id_cancion);


--
-- TOC entry 4906 (class 2606 OID 16503)
-- Name: playlist_canciones playlist_canciones_id_playlist_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_canciones
    ADD CONSTRAINT playlist_canciones_id_playlist_fk_fkey FOREIGN KEY (id_playlist_fk) REFERENCES public.playlists(id_playlist);


--
-- TOC entry 4904 (class 2606 OID 16490)
-- Name: playlists playlists_id_usuario_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_id_usuario_fk_fkey FOREIGN KEY (id_usuario_fk) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4914 (class 2606 OID 16611)
-- Name: solicitudes_canciones solicitudes_canciones_cancion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--




--
-- TOC entry 4915 (class 2606 OID 16606)
-- Name: solicitudes_canciones solicitudes_canciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_canciones
    ADD CONSTRAINT solicitudes_canciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4916 (class 2606 OID 16628)
-- Name: transmision transmision_cancion_actual_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transmision
    ADD CONSTRAINT transmision_cancion_actual_id_fkey FOREIGN KEY (cancion_actual_id) REFERENCES public.canciones(id_cancion);


--
-- TOC entry 4900 (class 2606 OID 16418)
-- Name: usuarios usuarios_id_persona_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_persona_fk_fkey FOREIGN KEY (id_persona_fk) REFERENCES public.persona(id_persona);


-- Completed on 2026-05-07 14:58:41

--
-- PostgreSQL database dump complete
--



