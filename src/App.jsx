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
import { FaWhatsapp } from "react-icons/fa";

import {
  ExternalLink,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Zap,
  ShieldHalf,
  Dumbbell,
  Target,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Utilidades de Design e Classes (Simulando shadcn/ui)
// -----------------------------------------------------------------------------

// Função de utilidade para unir classes Tailwind
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Componente Button (Simulação Shadcn)
const Button = ({ children, className, variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ease-in-out whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none focus:ring-offset-zinc-950";
  
  const variantClasses = {
    default: "bg-red-600 text-white shadow-lg shadow-red-600/50 hover:bg-red-700 focus:ring-red-600/70",
    secondary: "bg-zinc-700 text-white hover:bg-zinc-600 focus:ring-zinc-500/50",
    outline: "border border-zinc-700 text-white hover:bg-zinc-800 focus:ring-zinc-700/50",
    link: "text-red-600 underline-offset-4 hover:underline focus:ring-red-600/50",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-sm",
    lg: "h-12 px-8 text-base",
  };
};

// -----------------------------------------------------------------------------
// Dados Estáticos
// -----------------------------------------------------------------------------
const data = {
    WHATSAPP_LINK: "https://wa.me/5511969214329?text=Olá%20Galindo!%20Quero%20uma%20aula%20experimental",
    produtos: [
       { id: 1, nome: "Kimono Oficial", img: kimonoImg },
       { id: 2, nome: "Camiseta Galindo", img: camisaImg },
       { id: 3, nome: "Rash Guard Galindo", img: rashGuardImg },
       { id: 4, nome: "Viseira Galindo", img: viseiradImg },
       { id: 5, nome: "Boné Galindo", img: boneImg },
       { id: 6, nome: "Bermuda Galindo", img: bermudadImg },
       { id: 7, nome: "Bolsa Galindo", preco: "R$ 89", desc: "Malha 100% algodão.", img: sacoImg },
     ],
     depoimentos: [
       {
         nome: "Carlos Silva",
         texto: "Perdi 15kg e ganhei confiança! O ambiente da Galindo é incrível para quem está começando.",
         idade: "32 anos",
       },
       {
         nome: "Ana Paula",
         texto: "Como mulher, me sinto muito segura e acolhida. As aulas mudaram minha vida.",
         idade: "28 anos",
       },
       {
         nome: "João Mendes",
         texto: "Do iniciante absoluto ao campeão estadual em 2 anos. Metodologia que realmente funciona!",
         idade: "25 anos",
       },
     ],
     beneficios: [
         { title: "Condicionamento Físico", desc: "Aumente sua resistência, força e mobilidade.", icon: Dumbbell },
         { title: "Disciplina & Foco", desc: "Rotina, respeito e evolução contínua.", icon: Target },
         { title: "Autodefesa Efetiva", desc: "Técnicas práticas para situações reais de perigo.", icon: ShieldHalf },
       ],
     modalidades: [
         { name: "Jiu-Jitsu Adulto", desc: "Aulas adaptadas para todos os níveis", icon: "🥋" },
         { name: "Kids (4-12 anos)", desc: "Diversão, disciplina e desenvolvimento motor", icon: "👦" },
         { name: "No-Gi (Sem Kimono)", desc: "Jiu-Jitsu sem kimono, foco em pegadas e wrestling", icon: "🎽" },
         { name: "Competidores", desc: "Preparação tática e física de alto rendimento", icon: "🏆" },
         { name: "Iniciação (Absoluto)", desc: "Para quem nunca pisou num tatame. 100% didático.", icon: "🌟" },
       ],
     faq: [
         { 
           pergunta: "Preciso ter experiência prévia?", 
           resposta: "Não — temos turmas específicas para iniciantes absolutos. Nossos professores são especializados em ensinar desde o zero." 
         },
         { 
           pergunta: "Qual a idade mínima?", 
           resposta: "A partir de 4 anos no programa Kids, onde trabalhamos coordenação motora, disciplina e valores através do esporte." 
         },
         { 
           pergunta: "O que levar para a primeira aula?", 
           resposta: "Apenas roupa confortável (bermuda e camiseta)." 
         },
         { 
             pergunta: "Vocês oferecem aulas particulares?", 
             resposta: "Sim! Oferecemos aulas particulares flexíveis, ideais para acelerar seu aprendizado e focar em técnicas específicas." 
           },
       ],
 horarios: [
  {
    modalidade: "👶 Baby Class",
    descricao: "Para crianças iniciantes com foco em coordenação e disciplina.",
    icon: "🕔",
    image: treiningBabyClassImg,
  },
  {
    modalidade: "👦 Kids 1",
    descricao: "Desenvolvimento técnico e motor para crianças.",
    icon: "🕔",
    image: treiningKids1Img,
  },
  {
    modalidade: "👧 Kids 2",
    descricao: "Evolução técnica com disciplina e confiança.",
    icon: "🕡",
    image: treiningKids2Img,
  },
  {
    modalidade: "🥋 Adulto Iniciante",
    descricao: "Para quem nunca treinou ou está começando no Jiu-Jitsu.",
    icon: "🕢",
    image: treiningAdultosInicianteImg,
  },
  {
    modalidade: "🔥 Adulto Intermediário/Avançado",
    descricao: "Treino intenso para evolução técnica e competição.",
    icon: "🕣",
    image: treiningAdultosInicianteImg,
  },
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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Função para rolar até o Contato
  const scrollToContact = () => {
    setIsNavOpen(false);
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const Navbar = () => (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800/50 transition-all duration-500",
        isScrolled && "bg-zinc-950/98 shadow-2xl shadow-yellow-600/10 border-yellow-600/20"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo - Responsivo */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-[1.1rem] overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-300 p-2 shadow-2xl shadow-black/20 group-hover:shadow-yellow-600/30 transition-shadow duration-300">
            <img
              src={logoImg}
              alt="Logo Galindo Jiu-Jitsu"
              className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="flex flex-col leading-tight">
            <span className="text-base md:text-xl font-bold text-yellow-600 tracking-tight group-hover:text-yellow-500 transition-colors duration-300">
              Galindo
            </span>
            <span className="hidden sm:inline text-sm text-zinc-300 font-medium tracking-wide group-hover:text-zinc-200 transition-colors duration-300">
              Jiu-Jitsu
            </span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            onClick={() => scrollToSection("treinamento")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-yellow-600 transition-all duration-300 whitespace-nowrap relative group",
              activeSection === "treinamento" && "text-yellow-600"
            )}
          >
            Treinamento
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full",
              activeSection === "treinamento" && "w-full"
            )} />
          </a>

          <a
            onClick={() => scrollToSection("depoimentos")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-yellow-600 transition-all duration-300 whitespace-nowrap relative group",
              activeSection === "depoimentos" && "text-yellow-600"
            )}
          >
            Depoimentos
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full",
              activeSection === "depoimentos" && "w-full"
            )} />
          </a>

          <a
            onClick={() => scrollToSection("horarios")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-yellow-600 transition-all duration-300 whitespace-nowrap relative group",
              activeSection === "horarios" && "text-yellow-600"
            )}
          >
            Horários
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full",
              activeSection === "horarios" && "w-full"
            )} />
          </a>

          <a
            onClick={() => scrollToSection("contato")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-yellow-600 transition-all duration-300 whitespace-nowrap relative group",
              activeSection === "contato" && "text-yellow-600"
            )}
          >
            Contato
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full",
              activeSection === "contato" && "w-full"
            )} />
          </a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Button size="sm" onClick={scrollToContact} className="flex items-center gap-2 whitespace-nowrap shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-shadow duration-300">
            <Zap className="w-4 h-4" />
            <span className="hidden lg:inline">Aula Experimental</span>
            <span className="lg:hidden">Aula</span>
          </Button>
        </div>

        {/* Mobile Button */}
        <Button
          variant="outline"
          size="sm"
          className="md:hidden p-2 border-zinc-700 hover:border-red-600 transition-colors duration-300"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Abrir menu"
        >
          {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ opacity: isNavOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md",
          !isNavOpen && "pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setIsNavOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1">
                <img src={logoImg} alt="Logo Galindo" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold">Galindo</span>
                <span className="text-zinc-400 text-sm">Jiu-Jitsu</span>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => setIsNavOpen(false)} className="p-2">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-6">
            <Button size="lg" onClick={scrollToContact} className="w-full">
              Agendar Aula Experimental
            </Button>

            <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full">
              <Button size="lg" variant="outline" className="w-full flex items-center justify-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-green-500" />
                Falar no WhatsApp
              </Button>
            </a>

            <nav className="flex flex-col items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
              <button onClick={() => scrollToSection("treinamento")} className="text-white text-lg sm:text-xl hover:text-red-600 transition">
                Treinamento
              </button>
              <button onClick={() => scrollToSection("depoimentos")} className="text-white text-lg sm:text-xl hover:text-red-600 transition">
                Depoimentos
              </button>
              <button onClick={() => scrollToSection("horarios")} className="text-white text-lg sm:text-xl hover:text-red-600 transition">
                Horários
              </button>
              <button onClick={() => scrollToSection("contato")} className="text-white text-lg sm:text-xl hover:text-red-600 transition">
                Contato
              </button>
            </nav>
          </div>

          <p className="text-zinc-500 text-sm text-center mt-8 sm:mt-12">
            © {new Date().getFullYear()} Galindo Jiu-Jitsu
          </p>
        </div>
      </motion.div>
    </header>
  );

  // Efeito de scroll para encolher o header e adicionar sombra
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy para marcar a seção ativa
  useEffect(() => {
    const sections = ['treinamento', 'depoimentos', 'horarios', 'contato'];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(id);
        });
      }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const HeroSection = () => (
    <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[90vh] sm:h-[95vh] flex items-center overflow-hidden bg-zinc-950 pt-16"
    >
      {/* Background Effect: Dark Red Gradient + Simulated Texture/Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-95" style={{
        backgroundImage: `linear-gradient(rgba(10,12,18,0.92), rgba(15,23,42,0.65)), url(${equipeImg})`,
        backgroundPosition: 'center 50%',
        backgroundSize: 'cover',
      }} />

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-950/75 to-zinc-950/95" />

      {/* Content Container */}
      <div className="container mx-auto relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl py-12 sm:py-0">
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-red-700 font-bold uppercase tracking-widest mb-4 text-xs sm:text-sm"
        >
            Desde 2012 Formando Campeões
        </motion.p>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight"
        >
          Transforme sua Vida com o <span className="bg-gradient-to-r from-yellow-600 via-red-500 to-red-600 bg-clip-text text-transparent">Jiu-Jitsu</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-zinc-200 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto px-2"
        >
          Aulas para <strong className="text-yellow-600">iniciantes</strong>, femininas, kids e competidores. Sua jornada de <strong className="text-yellow-600">disciplina</strong>, foco e força começa aqui.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
        >
          <Button size="lg" onClick={scrollToContact} className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 via-red-500 to-red-600 text-zinc-950 shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/40 transition-all duration-300">
            <Zap className="w-5 h-5 mr-2" />
            <span className="text-sm sm:text-base font-semibold">Faça uma aula experimental GRÁTIS</span>
          </Button>
          <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-yellow-600 border border-yellow-600 hover:bg-yellow-600/10 hover:text-yellow-500">
              <Phone className="w-5 h-5 mr-2" />
              <span className="text-sm sm:text-base">Falar com Equipe Galindo</span>
            </Button>
          </a>
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm sm:text-base text-zinc-200">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 shadow-sm shadow-black/20">
            <span className="text-yellow-600">🥋</span>
            Mais de 10 turmas semanais
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 shadow-sm shadow-black/20">
            <span className="text-yellow-600">👨‍👩‍👧‍👦</span>
            Aulas para todas as idades
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 shadow-sm shadow-black/20">
            <span className="text-yellow-600">🏆</span>
            Preparação para competição
          </div>
        </div>
      </div>
    </motion.header>
  );

  const AboutSection = () => (
    <section className="py-12 sm:py-16 lg:py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <p className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base">Nossa História</p>
            <p className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base">Quem somos</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 lg:mb-6">
              Equipe Galindo Jiu-Jitsu
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-3 lg:mb-4">
              Desde 2012, a Equipe Galindo Jiu-Jitsu é sinônimo de trabalho sério, dedicação e paixão pelo esporte. Fundada para formar campeões dentro e fora do tatame, nossa prioridade é transformar vidas por meio da disciplina, respeito e superação.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-3 lg:mb-4">
              Sob a liderança do Professor Galindo, construímos uma trajetória sólida, reunindo atletas e alunos de todas as idades em um ambiente motivador e focado em resultados.
            </p>
            <p className="text-zinc-300 text-sm sm:text-base lg:text-lg font-semibold mt-4">Equipe Galindo Jiu-Jitsu — mais do que uma equipe, uma família.</p>
            <div className="mt-6 lg:mt-8">
                <Button variant="default" onClick={scrollToContact} className="w-full sm:w-auto">
                    Agende sua aula experimental
                </Button>
            </div>
          </motion.div>

   {/* Imagem do Mestre Galindo - Opção 3: Com altura automática */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 md:order-2 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md mx-auto">
            <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl shadow-red-600/10 bg-zinc-900">
              <img
                src={mestreGalindoImg}
                alt="Mestre Galindo"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
            
            {/* Badge decorativo */}
            <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg rotate-3 shadow-lg">
              🥋 Professor Galindo
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );

  const BenefitsSection = () => (
    <section id="treinamento" className="py-12 sm:py-16 lg:py-24 bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <p className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base">Valores</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8 lg:mb-12">
          Por que o Jiu-Jitsu é a melhor escolha?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {data.beneficios.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-950 p-4 sm:p-6 lg:p-8 rounded-xl border border-zinc-700 shadow-lg lg:shadow-xl shadow-red-600/10 hover:bg-zinc-800/70 transition duration-300 group"
              >
                <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-full bg-red-600/20 text-red-400 mb-4 lg:mb-6">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-white mb-2 lg:mb-3">
                  {b.title}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 lg:mt-12"
        >
            <Button size="lg" variant="default" onClick={scrollToContact} className="w-full sm:w-auto">
                Começar a Transformação Agora
            </Button>
        </motion.div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section id="depoimentos" className="py-12 sm:py-16 lg:py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <p className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base">Comunidade</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8 lg:mb-12">
          O que nossos alunos dizem
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {data.depoimentos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 100 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 text-left shadow-lg lg:shadow-2xl relative"
            >
              {/* Citação Acentuada */}
              <p className="text-4xl sm:text-5xl text-red-600 opacity-20 absolute top-2 sm:top-4 left-2 sm:left-4 font-serif">"</p>
              <div className="relative pt-4 sm:pt-6">
                <p className="text-zinc-300 italic text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                  "{d.texto}"
                </p>
              </div>
              <div className="flex items-center pt-3 sm:pt-4 border-t border-zinc-800">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/30 mr-2 sm:mr-3 flex items-center justify-center text-red-300 font-bold text-sm sm:text-base">
                  {d.nome.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm sm:text-base">{d.nome}</p>
                  <p className="text-red-400 text-xs sm:text-sm">{d.idade} - Aluno Graduado</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const ModalitiesSection = () => {
    const top3 = data.modalidades.slice(0, 3);
    const bottom2 = data.modalidades.slice(3, 5);

    const ModalityCard = ({ m, i }) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className="bg-zinc-800 p-4 sm:p-6 rounded-xl border border-zinc-700 shadow-md flex items-start text-left hover:border-red-600 transition duration-300 h-full"
      >
        <div className="text-2xl sm:text-3xl mr-3 sm:mr-4 mt-0 sm:mt-1">{m.icon}</div>
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1">{m.name}</h3>
          <p className="text-zinc-400 text-xs sm:text-sm">{m.desc}</p>
        </div>
      </motion.div>
    );

    return (
      <section className="py-12 sm:py-16 lg:py-24 bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <p className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base">Treinamento</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8 lg:mb-12">
            Nossas Modalidades
          </h2>
          
          {/* Linha com 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {top3.map((m, i) => <ModalityCard key={i} m={m} i={i} />)}
          </div>

          {/* Linha com 2 Cards Centralizados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="hidden lg:block"></div>
            {bottom2.map((m, i) => (
              <div className="sm:col-span-1 lg:col-span-2" key={i+3}>
                <ModalityCard m={m} i={i+3} />
              </div>
            ))}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>
    );
  };

  const ScheduleSection = () => {
    const kidsClasses = data.horarios.slice(0, 3); // Baby Class, Kids 1, Kids 2
    const adultClasses = data.horarios.slice(3); // Adulto Iniciante, Adulto Intermediário/Avançado

    return (
      <section id="horarios" className="py-12 sm:py-16 lg:py-24 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <p className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base">📅 Horários de Aulas</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8 lg:mb-12">
            Escolha Seu Melhor Horário
          </h2>

          {/* Aulas Infantis */}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-6 lg:mb-8">
              👶 Aulas Infantis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {kidsClasses.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Imagem */}
                  <div className="h-40 sm:h-48 overflow-hidden bg-zinc-800">
                    <img
                      src={h.image}
                      alt={h.modalidade}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{h.icon}</div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-2 sm:mb-3">{h.time}</h3>
                    <p className="text-white font-semibold text-base sm:text-lg flex-grow">
                      {h.modalidade}
                    </p>
                    <p className="text-zinc-400 text-sm mb-3">{h.descricao}</p>

                    <Button
                      variant="default"
                      size="sm"
                      className="w-full mt-3 sm:mt-4 text-sm sm:text-base"
                      onClick={scrollToContact}
                    >
                      Agendar Aula
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Aulas Adultas */}
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-6 lg:mb-8">
              🥋 Aulas Adultos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {adultClasses.map((h, i) => (
                <motion.div
                  key={i + 3}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                  className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Imagem */}
                  <div className="h-40 sm:h-48 overflow-hidden bg-zinc-800">
                    <img
                      src={h.image}
                      alt={h.modalidade}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{h.icon}</div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-2 sm:mb-3">{h.time}</h3>
                    <p className="text-white font-semibold text-base sm:text-lg flex-grow">
                      {h.modalidade}
                    </p>
                    <p className="text-zinc-400 text-sm mb-3">{h.descricao}</p>

                    <Button
                      variant="default"
                      size="sm"
                      className="w-full mt-3 sm:mt-4 text-sm sm:text-base"
                      onClick={scrollToContact}
                    >
                      Agendar Aula
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const PrivateLessonsSection = () => (
    <section className="py-12 sm:py-16 lg:py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base"
        >
          Aulas Particulares
        </motion.p>
  
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 lg:mb-8"
        >
          Aprendizado Personalizado e Acelerado
        </motion.h2>
  
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base lg:text-lg mb-6 lg:mb-10"
        >
          Nossas aulas particulares são ideais para quem deseja evoluir <strong>rapidamente</strong>,
          focando em técnicas específicas ou aperfeiçoando o desempenho competitivo.
        </motion.p>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <a href={data.WHATSAPP_LINK + "?text=Quero%20saber%20mais%20sobre%20aulas%20particulares"} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              📞 Solicitar Orçamento
            </Button>
          </a>
          <Button size="lg" variant="outline" onClick={scrollToContact} className="w-full sm:w-auto">
            🗓️ Agendar Aula
          </Button>
        </motion.div>
      </div>
    </section>
  );

  const StoreSection = () => {
    const roupasTreino = data.produtos.slice(0, 3); // Kimono, Camiseta, Rash Guard
    const acessorios = data.produtos.slice(3); // Viseira, Boné, Bermuda, Bolsa

    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-red-600 font-semibold uppercase text-center mb-2 text-sm sm:text-base">Vestuário</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center mb-4 lg:mb-6">
              Leve o orgulho da Equipe Galindo
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-6 lg:mb-8 text-sm sm:text-base">
            Na Galindo Store você encontra produtos oficiais: kimonos, camisetas, moletons e acessórios desenvolvidos com qualidade e identidade da nossa equipe.
          </p>

          {/* Roupas de Treino */}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 text-center mb-6 lg:mb-8">
              🥋 Roupas de Treino
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {roupasTreino.map((produto, i) => (
                <motion.div
                  key={produto.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-zinc-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-red-600/10 transition-shadow duration-300 border border-zinc-800"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-64 sm:h-72 bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={produto.img}
                      alt={produto.nome}
                      className="max-h-full w-auto object-contain transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-6 text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{produto.nome}</h3>
                    <p className="text-zinc-400 mb-3 text-xs sm:text-sm">{produto.desc}</p>
                    <div className="flex justify-center pt-2">
                      <a href={data.WHATSAPP_LINK + `?text=Quero%20comprar%20o%20produto:%20${produto.nome}`} target="_blank" rel="noreferrer">
                        <Button size="sm" className="flex items-center gap-1 text-xs sm:text-sm">
                          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" /> Comprar
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Acessórios */}
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 text-center mb-6 lg:mb-8">
              🧢 Acessórios
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {acessorios.map((produto, i) => (
                <motion.div
                  key={produto.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                  className="bg-zinc-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-red-600/10 transition-shadow duration-300 border border-zinc-800"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-64 sm:h-72 bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={produto.img}
                      alt={produto.nome}
                      className="max-h-full w-auto object-contain transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-6 text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{produto.nome}</h3>
                    <p className="text-zinc-400 mb-3 text-xs sm:text-sm">{produto.desc}</p>
                    <div className="flex justify-center pt-2">
                      <a href={data.WHATSAPP_LINK + `?text=Quero%20comprar%20o%20produto:%20${produto.nome}`} target="_blank" rel="noreferrer">
                        <Button size="sm" className="flex items-center gap-1 text-xs sm:text-sm">
                          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" /> Comprar
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div 
            className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950"
            animate={{ height: isOpen ? 'auto' : 'auto' }}
            transition={{ duration: 0.3 }}
        >
            <button
                className="w-full text-left p-3 sm:p-4 flex justify-between items-center bg-zinc-900 hover:bg-zinc-800 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-white font-semibold text-sm sm:text-base flex items-center">
                    <ChevronDown className={cn("w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-600 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
                    {title}
                </h3>
            </button>
            <div className={cn("p-3 sm:p-4 border-t border-zinc-800", !isOpen && 'hidden')}>
                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base pl-6 sm:pl-8">{content}</p>
            </div>
        </motion.div>
    );
  };

  const FAQSection = () => (
    <section className="py-12 sm:py-16 lg:py-24 bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p className="text-red-600 font-semibold uppercase mb-2 text-sm sm:text-base">Dúvidas Frequentes</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-8 lg:mb-12">
          Respostas Rápidas para Você
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {data.faq.map((item, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
            >
                <AccordionItem 
                    title={item.pergunta} 
                    content={item.resposta} 
                />
            </motion.div>
          ))}
        </div>
        <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-6 lg:mt-8 text-zinc-400 text-sm sm:text-base"
        >
            Ainda tem dúvidas? <a href={data.WHATSAPP_LINK} className="text-red-600 hover:underline font-bold">Fale conosco pelo WhatsApp.</a>
        </motion.p>
      </div>
    </section>
  );

const ContactSection = () => (
  <section ref={contactRef} id="contato" className="py-12 sm:py-16 lg:py-24 bg-zinc-950">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <p className="text-red-600 font-semibold uppercase text-center mb-2 text-sm sm:text-base">Localização</p>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center mb-8 lg:mb-12">
        Entre em Contato e Agende sua Aula
      </h2>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-zinc-300"
        >
          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-start gap-4">
              <div className="rounded-3xl bg-red-600/10 p-3 text-red-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-[0.2em] mb-2">Endereço</p>
                <p className="text-white text-base sm:text-lg font-semibold leading-relaxed">
                  Rua Arminda Cavalieri Dartora, 48, 2° piso, Jd. San Marino, Caieiras/SP
                </p>
                <p className="text-zinc-500 text-sm mt-2">CEP: 07743-420</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-4">
                <p className="text-zinc-400 uppercase text-[11px] tracking-[0.18em] mb-2">Telefone</p>
                <p className="text-white font-semibold">(11) 9 6921-4329</p>
              </div>
              <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-4">
                <p className="text-zinc-400 uppercase text-[11px] tracking-[0.18em] mb-2">Email</p>
                <p className="text-white font-semibold break-words whitespace-normal">equipegalindojiujitsu@yahoo.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href="https://www.instagram.com/equipe_galindo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white transition-colors hover:border-red-600 hover:text-red-400"
              >
                <Instagram className="w-5 h-5 text-red-500" />
                @equipe_galindo
              </a>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-400">
                <p className="text-sm sm:text-base">Facebook: Equipe Galindo Jiu Jitsu</p>
                <p className="text-sm sm:text-base">YouTube: @EquipeGalindoJiuJitsu</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/95 p-6 shadow-2xl shadow-black/20">
            <p className="text-white text-lg font-semibold mb-3">Aula Experimental</p>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Venha conhecer nossa estrutura, equipe e metodologia em uma aula gratuita. O melhor momento para começar é hoje.
            </p>
            <div className="mt-6">
              <Button size="lg" className="w-full" onClick={scrollToContact}>
                📞 Agende sua aula agora
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[2rem] border border-red-600/20 bg-gradient-to-br from-red-950/90 via-zinc-950 to-zinc-900 shadow-2xl shadow-red-600/15"
        >
          <div className="p-8 sm:p-10 text-center">
            <p className="text-red-400 uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-4">Estamos te esperando</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Visite nossa unidade em Caieiras</h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Mais que um local de treino, um espaço de superação. Aqui você encontra estrutura moderna, professores dedicados e um ambiente acolhedor para todas as idades.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/95 p-4 text-left">
                <p className="text-zinc-400 uppercase text-[11px] tracking-[0.18em] mb-2">Horário</p>
                <p className="text-white font-semibold">Segunda a Sexta</p>
                <p className="text-zinc-500 text-sm">17h30 às 21h30</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/95 p-4 text-left">
                <p className="text-zinc-400 uppercase text-[11px] tracking-[0.18em] mb-2">Turmas</p>
                <p className="text-white font-semibold">Kids e Adultos</p>
                <p className="text-zinc-500 text-sm">Iniciantes, avançado e competidores</p>
              </div>
            </div>

            <div className="mt-8">
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 border-red-600">
                Entrar em contato agora
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

  const Footer = () => (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <p className="text-white text-xl sm:text-2xl font-bold">Galindo Jiu-Jitsu</p>
            <p className="text-zinc-400 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
              A escola com foco em evolução, disciplina e acolhimento. Agende sua primeira aula e venha treinar com a nossa família.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <button onClick={() => scrollToSection('treinamento')} className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-red-600 hover:text-red-400">
              Treinamento
            </button>
            <button onClick={() => scrollToSection('horarios')} className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-red-600 hover:text-red-400">
              Horários
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-6 text-center text-zinc-500 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Galindo Jiu-Jitsu. Todos os direitos reservados. 🥋</p>
        </div>
      </div>
    </footer>
  );

  const FixedWhatsappButton = () => (
    <motion.a
      href={data.WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Tooltip - Apenas em telas maiores */}
      <div className="hidden sm:block mb-2 bg-green-600 text-white text-xs font-semibold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
        Fale conosco!
      </div>
      
      {/* Botão principal */}
      <div className="relative p-3 sm:p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl sm:shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300">
        <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        
        {/* Anel animado */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-20"></div>
      </div>
    </motion.a>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased">
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