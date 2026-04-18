import React, { useState, useRef, useEffect } from "react";
import equipeImg from "./assets/imagens/equipe.jpeg";
import kimonoImg from "./assets/imagens/kimono.jpeg";
import camisaImg from "./assets/imagens/camiseta.jpeg";
import rashGuardImg from "./assets/imagens/rash-guard.jpeg";
import boneImg from "./assets/imagens/bone.jpeg";
import bermudadImg from "./assets/imagens/bermuda.jpeg";
import sacoImg from "./assets/imagens/saco.jpeg";
import viseiradImg from "./assets/imagens/viseira.jpeg";
import logoImg from "./assets/imagens/logo.jpg";
import mestreGalindoImg from "./assets/imagens/mestre-galindo.jpeg";
import treiningBabyClassImg from "./assets/imagens/baby-class.jpeg";
import treiningKids1Img from "./assets/imagens/kids-1.jpeg";
import treiningKids2Img from "./assets/imagens/kids-2.jpeg";
import treiningAdultosInicianteImg from "./assets/imagens/adultos-iniciante.jpeg";
import { motion } from "framer-motion";
import { FaWhatsapp, FaFacebookF, FaYoutube } from "react-icons/fa";

import {
  Instagram,
  MapPin,
  ShoppingBag,
  Zap,
  ShieldHalf,
  Dumbbell,
  Target,
  ChevronDown,
  Menu,
  X,
  Clock,
  Users,
  ArrowRight,
  Star,
  Heart,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Utilidades de Design e Classes
// -----------------------------------------------------------------------------
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = ({ children, className, variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ease-out whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variantClasses = {
    default: "bg-gradient-to-r from-yellow-600 to-red-600 text-white shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:from-yellow-500 hover:to-red-500 focus:ring-red-600",
    secondary: "bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 focus:ring-zinc-600",
    outline: "border border-zinc-700 bg-transparent text-white hover:bg-zinc-800/80 hover:border-zinc-500 focus:ring-zinc-600",
    link: "text-red-500 underline-offset-4 hover:underline focus:ring-red-600 p-0 h-auto",
  };

  const sizeClasses = {
    default: "h-11 px-6 py-2 text-sm",
    sm: "h-9 px-4 text-xs",
    lg: "h-14 px-8 text-base",
    icon: "h-10 w-10 p-0",
  };

  return (
    <button 
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

// -----------------------------------------------------------------------------
// Dados Estáticos
// -----------------------------------------------------------------------------
const data = {
    WHATSAPP_LINK: "https://wa.me/5511969214329?text=Olá%20Galindo!%20Quero%20uma%20aula%20experimental",
    produtos: [
       { id: 1, nome: "Kimono Oficial", img: kimonoImg, desc: "Leve e resistente", destaque: true },
       { id: 2, nome: "Camiseta Galindo", img: camisaImg, desc: "100% algodão" },
       { id: 3, nome: "Rash Guard", img: rashGuardImg, desc: "Proteção UV", destaque: true },
       { id: 4, nome: "Viseira", img: viseiradImg, desc: "Ajuste perfeito" },
       { id: 5, nome: "Boné", img: boneImg, desc: "Estilo casual" },
       { id: 6, nome: "Bermuda", img: bermudadImg, desc: "Alta performance" },
       { id: 7, nome: "Bolsa", img: sacoImg, desc: "Capacidade 60L" },
     ],
     depoimentos: [
       { nome: "Carlos Silva", texto: "Perdi 15kg e ganhei confiança! O ambiente da Galindo é incrível para quem está começando.", idade: "32 anos" },
       { nome: "Ana Paula", texto: "Como mulher, me sinto muito segura e acolhida. As aulas mudaram minha vida.", idade: "28 anos" },
       { nome: "João Mendes", texto: "Do iniciante absoluto ao campeão estadual em 2 anos. Metodologia que realmente funciona!", idade: "25 anos" },
     ],
     beneficios: [
         { title: "Condicionamento Físico", desc: "Aumente sua resistência, força e mobilidade.", icon: Dumbbell },
         { title: "Disciplina & Foco", desc: "Rotina, respeito e evolução contínua.", icon: Target },
         { title: "Autodefesa Efetiva", desc: "Técnicas práticas para situações reais de perigo.", icon: ShieldHalf },
       ],
     modalidades: [
         { name: "Jiu-Jitsu Adulto", desc: "Aulas adaptadas para todos os níveis", icon: "🥋" },
         { name: "Kids (4-12 anos)", desc: "Diversão, disciplina e desenvolvimento motor", icon: "👦" },
         { name: "No-Gi (Sem Kimono)", desc: "Foco em pegadas e wrestling", icon: "🎽" },
         { name: "Competidores", desc: "Preparação tática de alto rendimento", icon: "🏆" },
         { name: "Iniciação (Absoluto)", desc: "Para quem nunca pisou num tatame.", icon: "🌟" },
       ],
     faq: [
         { pergunta: "Preciso ter experiência prévia?", resposta: "Não — temos turmas específicas para iniciantes absolutos." },
         { pergunta: "Qual a idade mínima?", resposta: "A partir de 4 anos no programa Kids." },
         { pergunta: "O que levar para a primeira aula?", resposta: "Apenas roupa confortável (bermuda e camiseta)." },
         { pergunta: "Vocês oferecem aulas particulares?", resposta: "Sim! Oferecemos aulas particulares flexíveis." },
       ],
     horarios: [
        { modalidade: "Baby Class", descricao: "Coordenação motora e disciplina para os pequenos.", image: treiningBabyClassImg, icon: "👶", nivel: "Iniciante" },
        { modalidade: "Kids 1", descricao: "Desenvolvimento técnico e motor para crianças.", image: treiningKids1Img, icon: "👦", nivel: "Iniciante" },
        { modalidade: "Kids 2", descricao: "Evolução técnica com disciplina e confiança.", image: treiningKids2Img, icon: "👧", nivel: "Intermediário" },
        { modalidade: "Adulto Iniciante", descricao: "Fundamentos do Jiu-Jitsu para quem começa.", image: treiningAdultosInicianteImg, icon: "🥋", nivel: "Iniciante" },
        { modalidade: "Adulto Avançado", descricao: "Treino intenso, sparring e preparação para competição.", image: treiningAdultosInicianteImg, icon: "🔥", nivel: "Avançado" },
     ]
   };

// -----------------------------------------------------------------------------
// Componente Principal
// -----------------------------------------------------------------------------

export default function GalindoLandingPremium() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const contactRef = useRef(null); 

  const scrollToSection = (id) => {
    setIsNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContact = () => {
    setIsNavOpen(false);
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const Navbar = () => (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "bg-zinc-950/95 backdrop-blur-xl border-b border-yellow-600/20 shadow-2xl shadow-black/50" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Logo sem fundo branco - mantendo original */}
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xl shadow-yellow-600/20 group-hover:shadow-yellow-600/40 transition-all duration-300">
            <img src={logoImg} alt="Logo Galindo" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-white tracking-tight">Galindo</span>
            <span className="text-xs text-yellow-600 font-medium tracking-wider -mt-1">JIU-JITSU</span>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {['Treinamento', 'Depoimentos', 'Horários', 'Contato'].map((item) => {
            const sectionId = item === 'Horários' ? 'horarios' : 
                             item === 'Treinamento' ? 'treinamento' :
                             item === 'Depoimentos' ? 'depoimentos' : 'contato';
            return (
              <a
                key={item}
                onClick={() => scrollToSection(sectionId)}
                className={cn(
                  "cursor-pointer text-sm font-medium transition-colors duration-300 relative py-2",
                  activeSection === sectionId ? "text-yellow-500" : "text-zinc-300 hover:text-white"
                )}
              >
                {item}
                {activeSection === sectionId && (
                  <motion.span layoutId="activeSection" className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button size="sm" onClick={scrollToContact} className="hidden md:flex shadow-xl shadow-red-600/20">
            <Zap className="w-4 h-4 mr-2" />
            Aula Grátis
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-zinc-700"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: isNavOpen ? 1 : 0, y: isNavOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800",
          !isNavOpen && "pointer-events-none"
        )}
      >
        <div className="flex flex-col p-6 gap-4">
          {['Treinamento', 'Depoimentos', 'Horários', 'Contato'].map((item) => {
            const sectionId = item === 'Horários' ? 'horarios' : 
                             item === 'Treinamento' ? 'treinamento' :
                             item === 'Depoimentos' ? 'depoimentos' : 'contato';
            return (
              <button
                key={item}
                onClick={() => scrollToSection(sectionId)}
                className="text-white text-lg font-medium py-2 hover:text-yellow-500 transition-colors text-left"
              >
                {item}
              </button>
            );
          })}
          <Button size="lg" onClick={scrollToContact} className="mt-4 w-full justify-center">
            Agendar Aula Experimental
          </Button>
        </div>
      </motion.div>
    </header>
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['treinamento', 'depoimentos', 'horarios', 'contato'];
    const observers = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(id); });
      }, { rootMargin: '-40% 0px -40% 0px' });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const HeroSection = () => (
    <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(20,20,30,0.7)), url(${equipeImg})`,
        backgroundPosition: 'center 30%',
      }} />
      
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />

      <div className="container mx-auto relative z-10 text-center px-4 py-20 md:py-0">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-red-600/10 backdrop-blur-sm border border-red-600/30 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-red-500 font-semibold uppercase tracking-wider text-xs">Desde 2012 Formando Campeões</span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight max-w-5xl mx-auto"
        >
          Transforme sua Vida com o{" "}
          <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-red-600 bg-clip-text text-transparent">
            Jiu-Jitsu
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-zinc-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto"
        >
          Aulas para <strong className="text-yellow-500">iniciantes</strong>, crianças, adultos e competidores. 
          Sua jornada de <strong className="text-yellow-500">disciplina</strong>, foco e força começa aqui.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" onClick={scrollToContact} className="group">
            Agende sua Aula Grátis
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="border-zinc-600 text-white hover:bg-zinc-800">
              <FaWhatsapp className="w-5 h-5 mr-2 text-green-500" />
              Falar no WhatsApp
            </Button>
          </a>
        </motion.div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {['🥋 +10 Turmas Semanais', '👨‍👩‍👧‍👦 Todas as Idades', '🏆 Preparação Competitiva'].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full px-5 py-2 text-sm text-zinc-300"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.header>
  );

  const AboutSection = () => (
    <section className="py-20 lg:py-28 bg-zinc-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Nossa História</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-6">
              Equipe Galindo Jiu-Jitsu
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Desde 2012, a Equipe Galindo Jiu-Jitsu é sinônimo de trabalho sério, dedicação e paixão pelo esporte. 
                Fundada para formar campeões dentro e fora do tatame, nossa prioridade é transformar vidas por meio da disciplina, respeito e superação.
              </p>
              <p>
                Sob a liderança do Professor Galindo, construímos uma trajetória sólida, reunindo atletas e alunos de todas as idades em um ambiente motivador e focado em resultados.
              </p>
              <p className="text-white font-semibold">Equipe Galindo Jiu-Jitsu — mais do que uma equipe, uma família.</p>
            </div>
            <div className="mt-8">
              <Button onClick={scrollToContact}>
                Conheça nossa estrutura
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border-2 border-zinc-800 shadow-2xl shadow-red-600/10">
              <img
                src={mestreGalindoImg}
                alt="Mestre Galindo"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl rotate-3">
              🥋 Professor Galindo
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-600/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-600/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const BenefitsSection = () => (
    <section id="treinamento" className="py-20 lg:py-28 bg-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Valores</span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-12">
          Por que o Jiu-Jitsu é a melhor escolha?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {data.beneficios.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-red-600/50 transition-all duration-300 group"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-red-600/20 to-yellow-600/20 text-red-500 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{b.title}</h3>
                <p className="text-zinc-400">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const ModalitiesSection = () => (
    <section className="py-20 lg:py-28 bg-zinc-950">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Treinamento</span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-12">
          Nossas Modalidades
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.modalidades.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-left hover:border-red-600/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className="text-3xl mb-4">{m.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{m.name}</h3>
              <p className="text-zinc-400 text-sm">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section id="depoimentos" className="py-20 lg:py-28 bg-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Comunidade</span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-12">
          O que nossos alunos dizem
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.depoimentos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-left relative group hover:border-red-600/30 transition-all duration-300"
            >
              <p className="text-6xl text-red-600/20 absolute top-4 left-4 font-serif">"</p>
              <div className="relative pt-8">
                <p className="text-zinc-300 italic leading-relaxed mb-6">
                  {d.texto}
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center text-white font-bold">
                  {d.nome.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{d.nome}</p>
                  <p className="text-red-400 text-sm">{d.idade} • Aluno</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

 const ScheduleSection = () => (
  <section id="horarios" className="py-20 lg:py-28 bg-zinc-950">
    <div className="container mx-auto px-4 max-w-6xl text-center">
      <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Nossas Aulas</span>
      <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-4">
        Escolha Sua Turma
      </h2>
      <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">
        Temos turmas para todas as idades e níveis. Encontre a ideal para você ou seu filho.
      </p>
      
      {/* Grid alinhado - 3 em cima, 2 embaixo centralizados */}
      <div className="space-y-6">
        {/* Primeira linha - 3 cards (Baby Class, Kids 1, Kids 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.horarios.slice(0, 3).map((h, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group hover:border-red-600/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={h.image} 
                  alt={h.modalidade} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white border border-white/10">
                  {h.nivel}
                </div>
              </div>
              <div className="p-6 text-left flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{h.icon}</span>
                  <h3 className="text-white font-bold text-xl">{h.modalidade}</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">{h.descricao}</p>
                <Button size="sm" className="w-full" onClick={scrollToContact}>
                  Agendar Aula Experimental
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Segunda linha - 2 cards centralizados (Adulto Iniciante, Adulto Avançado) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {data.horarios.slice(3, 5).map((h, i) => (
            <motion.div
              key={i + 3}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 3) * 0.05 }}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group hover:border-red-600/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={h.image} 
                  alt={h.modalidade} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white border border-white/10">
                  {h.nivel}
                </div>
              </div>
              <div className="p-6 text-left flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{h.icon}</span>
                  <h3 className="text-white font-bold text-xl">{h.modalidade}</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">{h.descricao}</p>
                <Button size="sm" className="w-full" onClick={scrollToContact}>
                  Agendar Aula Experimental
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Card de informação adicional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 bg-gradient-to-r from-red-600/10 to-yellow-600/10 border border-red-600/20 rounded-2xl p-6 text-center"
      >
        <p className="text-white font-medium">
          📞 Não sabe qual turma escolher?{" "}
          <button onClick={scrollToContact} className="text-yellow-500 hover:underline font-bold">
            Fale com a gente
          </button>
          {" "}e nós ajudamos você!
        </p>
      </motion.div>
    </div>
  </section>
);

  const PrivateLessonsSection = () => (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-yellow-600/20 to-red-600/20 mb-4">
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Aulas Particulares</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-4">
            Aprendizado Personalizado
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto mb-8">
            Evolua rapidamente com atenção exclusiva do professor. Ideal para quem busca aperfeiçoamento técnico ou preparação para competições.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={data.WHATSAPP_LINK + "?text=Quero%20saber%20mais%20sobre%20aulas%20particulares"} target="_blank" rel="noreferrer">
              <Button size="lg">
                📞 Solicitar Orçamento
              </Button>
            </a>
            <Button size="lg" variant="outline" onClick={scrollToContact}>
              🗓️ Agendar Aula
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const StoreSection = () => (
    <section className="py-20 lg:py-28 bg-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Loja Oficial</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-4">
            Equipamentos e acessórios exclusivos
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Leve o orgulho da Equipe Galindo com produtos oficiais de alta qualidade.
          </p>
        </div>

        {/* Grid alinhado - 4 em cima, 3 embaixo centralizados */}
        <div className="space-y-6">
          {/* Primeira linha - 4 produtos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.produtos.slice(0, 4).map((produto, i) => (
              <motion.div
                key={produto.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 group hover:border-red-600/30 transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 flex items-center justify-center">
                  <img
                    src={produto.img}
                    alt={produto.nome}
                    className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white font-semibold text-sm md:text-base">{produto.nome}</h3>
                  <p className="text-zinc-400 text-xs mb-3">{produto.desc}</p>
                  <a href={data.WHATSAPP_LINK + `?text=Quero%20comprar%20o%20produto:%20${produto.nome}`} target="_blank" rel="noreferrer">
                    <Button size="sm" className="w-full text-xs">
                      <ShoppingBag className="w-3 h-3 mr-1" /> Comprar
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Segunda linha - 3 produtos centralizados */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {data.produtos.slice(4, 7).map((produto, i) => (
              <motion.div
                key={produto.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 4) * 0.05 }}
                className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 group hover:border-red-600/30 transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 flex items-center justify-center">
                  <img
                    src={produto.img}
                    alt={produto.nome}
                    className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white font-semibold text-sm md:text-base">{produto.nome}</h3>
                  <p className="text-zinc-400 text-xs mb-3">{produto.desc}</p>
                  <a href={data.WHATSAPP_LINK + `?text=Quero%20comprar%20o%20produto:%20${produto.nome}`} target="_blank" rel="noreferrer">
                    <Button size="sm" className="w-full text-xs">
                      <ShoppingBag className="w-3 h-3 mr-1" /> Comprar
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const FAQSection = () => {
    const AccordionItem = ({ title, content }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/50">
          <button
            className="w-full text-left p-4 flex justify-between items-center hover:bg-zinc-900/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-white font-medium">{title}</span>
            <ChevronDown className={cn("w-5 h-5 text-red-500 transition-transform", isOpen && "rotate-180")} />
          </button>
          <div className={cn("px-4 pb-4 text-zinc-400 text-sm", !isOpen && 'hidden')}>
            {content}
          </div>
        </div>
      );
    };

    return (
      <section className="py-20 lg:py-28 bg-zinc-950">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Dúvidas Frequentes</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-12">
            Respostas Rápidas para Você
          </h2>
          <div className="space-y-3 text-left">
            {data.faq.map((item, i) => (
              <AccordionItem key={i} title={item.pergunta} content={item.resposta} />
            ))}
          </div>
          <p className="mt-8 text-zinc-400">
            Ainda tem dúvidas? <a href={data.WHATSAPP_LINK} className="text-red-500 hover:underline font-semibold">Fale conosco pelo WhatsApp.</a>
          </p>
        </div>
      </section>
    );
  };

  const ContactSection = () => (
    <section ref={contactRef} id="contato" className="py-20 lg:py-28 bg-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Localização</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3">
            Venha nos Visitar
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-red-600/10 text-red-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Endereço</p>
                <p className="text-white font-semibold text-lg">
                  Rua Arminda Cavalieri Dartora, 48, 2° piso
                </p>
                <p className="text-zinc-400">Jd. San Marino, Caieiras/SP • CEP: 07743-420</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Telefone</p>
                <p className="text-white font-semibold">(11) 9 6921-4329</p>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Email</p>
                <p className="text-white font-semibold text-sm">equipegalindojiujitsu@yahoo.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <a href="https://www.instagram.com/equipe_galindo/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:text-red-500 transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:text-red-500 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-950/30 to-zinc-950 rounded-3xl p-8 border border-red-600/20"
          >
            <div className="inline-flex p-3 rounded-full bg-red-600/10 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h3>
            <p className="text-zinc-300 mb-6">
              Agende sua aula experimental gratuita e descubra como o Jiu-Jitsu pode transformar sua vida.
            </p>
            <div className="flex items-center gap-3 text-sm text-zinc-400 mb-6">
              <Clock className="w-4 h-4 text-red-500" />
              <span>Segunda a Sexta • 17h30 às 21h30</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400 mb-8">
              <Users className="w-4 h-4 text-red-500" />
              <span>Turmas Kids e Adultos • Iniciantes ao Avançado</span>
            </div>
            <Button size="lg" className="w-full" onClick={scrollToContact}>
              Agendar Aula Experimental
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src={logoImg} alt="Logo Galindo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Galindo</p>
                <p className="text-yellow-600 text-xs tracking-wider">JIU-JITSU</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              Formando campeões dentro e fora do tatame desde 2012. Venha fazer parte da nossa família.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {['Treinamento', 'Depoimentos', 'Horários', 'Contato'].map((item) => {
                const sectionId = item === 'Horários' ? 'horarios' : 
                                 item === 'Treinamento' ? 'treinamento' :
                                 item === 'Depoimentos' ? 'depoimentos' : 'contato';
                return (
                  <li key={item}>
                    <button onClick={() => scrollToSection(sectionId)} className="text-zinc-400 hover:text-red-500 transition-colors">
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.instagram.com/equipe_galindo/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors">Instagram</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">Facebook</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">YouTube</a></li>
              <li><a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Galindo Jiu-Jitsu. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <span>Desenvolvido com</span>
            <span className="text-red-500">❤️</span>
            <span>para a Equipe Galindo</span>
          </div>
        </div>
      </div>
    </footer>
  );

  const FixedWhatsappButton = () => (
    <motion.a
      href={data.WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-xl shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-105">
          <FaWhatsapp className="w-6 h-6" />
        </div>
      </div>
    </motion.a>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-red-600/30">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <ModalitiesSection /> 
        <TestimonialsSection />
        <ScheduleSection />
        <PrivateLessonsSection /> 
        <StoreSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FixedWhatsappButton />
    </div>
  );
}