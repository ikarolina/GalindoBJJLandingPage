import React, { useState, useRef, useEffect } from "react";
import equipeImg from "./assets/imagens/equipe.jpeg";
import kimonoImg from "./assets/imagens/kimono.jpeg";
import moletomImg from "./assets/imagens/moletom.jpeg";
import camisaImg from "./assets/imagens/camiseta.jpeg";
import logoImg from "./assets/imagens/logo.jpg";
import mestreGalindoImg from "./assets/imagens/mestre-galindo.jpeg";
import treiningKids from "./assets/imagens/treino-criancas.jpeg";
import treiningKidsJpg from "./assets/imagens/treino-kids.jpeg";
import treiningInitiateImg from "./assets/imagens/treino-adulto-iniciante.jpeg";
import treiningAdvancedImg from "./assets/imagens/treino-adulto-avancado-intermediario.jpeg";

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

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// -----------------------------------------------------------------------------
// Dados Estáticos
// -----------------------------------------------------------------------------
const data = {
    WHATSAPP_LINK: "https://wa.me/5511969214329?text=Olá%20Galindo!%20Quero%20uma%20aula%20experimental",
    produtos: [
       { id: 1, nome: "Kimono Oficial", preco: "R$ 399", desc: "Corte Competition - Aprovado CBJJ.", img: kimonoImg },
       { id: 2, nome: "Camiseta Galindo", preco: "R$ 89", desc: "Malha 100% algodão.", img: camisaImg },
       { id: 3, nome: "Moletom Premium", preco: "R$ 199", desc: "Forro felpado premium.", img: moletomImg },
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
         time: "17:30 às 18:30",
         modalidade: "👦 Kids 1",
         icon: "🕔",
         image: treiningKids,
       },
       {
         time: "18:30 às 19:30",
         modalidade: "👧 Kids 2",
         icon: "🕡",
         image: treiningKidsJpg,
       },
       {
         time: "19:30 às 20:30",
         modalidade: "🥋 Modo Iniciante",
         icon: "🕢",
         image: treiningInitiateImg,
       },
       {
         time: "20:30 às 21:30",
         modalidade: "🔥 Modo Intermediário e Avançado",
         icon: "🕣",
         image: treiningAdvancedImg,
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
        "sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 transition-all duration-300",
        isScrolled && "shadow-xl bg-zinc-950/95"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo - Corrigido */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-white p-1">
            <img
              src={logoImg}
              alt="Logo Galindo Jiu-Jitsu"
              className="h-full w-auto object-contain"
            />
          </div>
          
          <div className="flex flex-col leading-tight">
            <span className="text-base md:text-lg font-bold text-red-600 tracking-tight">
              Galindo
            </span>
            <span className="text-xs text-zinc-300 font-medium tracking-wide">
              Jiu-Jitsu
            </span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            onClick={() => scrollToSection("treinamento")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-white transition",
              activeSection === "treinamento" && "text-red-600"
            )}
          >
            Treinamento
          </a>

          <a
            onClick={() => scrollToSection("depoimentos")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-white transition",
              activeSection === "depoimentos" && "text-red-600"
            )}
          >
            Depoimentos
          </a>

          <a
            onClick={() => scrollToSection("horarios")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-white transition",
              activeSection === "horarios" && "text-red-600"
            )}
          >
            Horários
          </a>

          <a
            onClick={() => scrollToSection("contato")}
            className={cn(
              "cursor-pointer text-sm font-medium text-zinc-300 hover:text-white transition",
              activeSection === "contato" && "text-red-600"
            )}
          >
            Contato
          </a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" onClick={scrollToContact} className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Aula Experimental
          </Button>

          <a
            href={data.WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex items-center"
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg hover:shadow-green-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="w-5 h-5 text-white" />
            </motion.div>
          </a>
        </div>

        {/* Mobile Button */}
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Abrir menu"
        >
          {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu - Corrigir logo também */}
      <motion.div
        initial={false}
        animate={{ opacity: isNavOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md p-6",
          !isNavOpen && "pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
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

            <Button variant="outline" onClick={() => setIsNavOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6">
            <Button size="lg" onClick={scrollToContact}>
              Agendar Aula Experimental
            </Button>

            <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="w-full flex items-center justify-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-green-500" />
                Falar no WhatsApp
              </Button>
            </a>

            <nav className="flex flex-col items-center gap-4 pt-6">
              <button onClick={() => scrollToSection("treinamento")} className="text-white text-lg">
                Treinamento
              </button>
              <button onClick={() => scrollToSection("depoimentos")} className="text-white text-lg">
                Depoimentos
              </button>
              <button onClick={() => scrollToSection("horarios")} className="text-white text-lg">
                Horários
              </button>
              <button onClick={() => scrollToSection("contato")} className="text-white text-lg">
                Contato
              </button>
            </nav>
          </div>

          <p className="text-zinc-500 text-sm text-center">
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
        className="relative h-[95vh] flex items-center overflow-hidden bg-zinc-950"
    >
      {/* Background Effect: Dark Red Gradient + Simulated Texture/Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.5)), url("https://placehold.co/1200x800/18181b/dc2626?text=Tatame")',
        backgroundPosition: 'center 60%',
        backgroundSize: 'cover',
      }} />

      {/* Content Container */}
      <div className="container mx-auto relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-red-500 font-bold uppercase tracking-widest mb-4 text-sm"
        >
            Desde 2012 Formando Campeões
        </motion.p>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
        >
          Transforme sua Vida com o <span className="text-red-600">Jiu-Jitsu</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-zinc-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
        >
          Aulas para **iniciantes**, femininas, kids e competidores. Sua jornada de **disciplina**, foco e força começa aqui.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" onClick={scrollToContact}>
            <Zap className="w-5 h-5 mr-2" />
           Faça uma aula experimental GRÁTIS.
          </Button>
          <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="hover:bg-red-600/10">
              <Phone className="w-5 h-5 mr-2" />
              Falar com Equipe Galindo
            </Button>
          </a>
        </motion.div>
      </div>
    </motion.header>
  );


  const AboutSection = () => (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-600 font-semibold uppercase mb-2">Nossa História</p>
              <p className="text-red-600 font-semibold uppercase mb-2">Quem somos</p>
              <h2 className="text-4xl font-extrabold text-white mb-6">
                Equipe Galindo Jiu-Jitsu
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                Desde 2012, a Equipe Galindo Jiu-Jitsu é sinônimo de trabalho sério, dedicação e paixão pelo esporte. Fundada para formar campeões dentro e fora do tatame, nossa prioridade é transformar vidas por meio da disciplina, respeito e superação.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                Sob a liderança do Professor Galindo, construímos uma trajetória sólida, reunindo atletas e alunos de todas as idades em um ambiente motivador e focado em resultados. Aqui você treina com metodologia comprovada, instrutores qualificados e atenção individual para sua evolução.
              </p>
              <p className="text-zinc-300 text-lg font-semibold mt-4">Equipe Galindo Jiu-Jitsu — mais do que uma equipe, uma família.</p>
              <div className="mt-8">
                  <Button variant="default" onClick={scrollToContact}>
                      Agende sua aula experimental
                  </Button>
              </div>
          </motion.div>

          {/* Imagem com Efeito Visual Acentuado */}
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-red-600/10 bg-zinc-900 h-screen max-h-96 relative"
        >
            <img
                src={mestreGalindoImg}
                alt="Mestre Galindo"
                className="w-full h-full object-contain z-10 hover:scale-105 transition-transform duration-500"
            />
        </motion.div>
        </div>
      </div>
    </section>
  );

  const BenefitsSection = () => (
    <section id="treinamento" className="py-24 bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <p className="text-red-600 font-semibold uppercase mb-2">Valores</p>
        <h2 className="text-4xl font-extrabold text-white mb-12">
          Por que o Jiu-Jitsu é a melhor escolha?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {data.beneficios.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-950 p-8 rounded-xl border border-zinc-700 shadow-xl shadow-red-600/10 hover:bg-zinc-800/70 transition duration-300 group"
              >
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-600/20 text-red-400 mb-6">
                  <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {b.title}
                </h3>
                <p className="text-zinc-400">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
        >
            <Button size="lg" variant="default" onClick={scrollToContact}>
                Começar a Transformação Agora
            </Button>
        </motion.div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section id="depoimentos" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <p className="text-red-600 font-semibold uppercase mb-2">Comunidade</p>
        <h2 className="text-4xl font-extrabold text-white mb-12">
          O que nossos alunos dizem
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.depoimentos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 100 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left shadow-2xl relative"
            >
              {/* Citação Acentuada */}
              <p className="text-5xl text-red-600 opacity-20 absolute top-4 left-4 font-serif">"</p>
              <div className="relative pt-6">
                <p className="text-zinc-300 italic text-lg leading-relaxed mb-6">
                  "{d.texto}"
                </p>
              </div>
              <div className="flex items-center pt-4 border-t border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-red-600/30 mr-3 flex items-center justify-center text-red-300 font-bold">
                  {d.nome.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{d.nome}</p>
                  <p className="text-red-400 text-sm">{d.idade} - Aluno Graduado</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const ModalitiesSection = () => {
    // Pegando as 3 primeiras e as 2 últimas modalidades
    const top3 = data.modalidades.slice(0, 3);
    const bottom2 = data.modalidades.slice(3, 5);

    const ModalityCard = ({ m, i }) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 shadow-md flex items-start text-left hover:border-red-600 transition duration-300 h-full"
      >
        <div className="text-3xl mr-4 mt-1">{m.icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
          <p className="text-zinc-400 text-sm">{m.desc}</p>
        </div>
      </motion.div>
    );

    return (
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <p className="text-red-600 font-semibold uppercase mb-2">Treinamento</p>
          <h2 className="text-4xl font-extrabold text-white mb-12">
            Nossas Modalidades
          </h2>
          
          {/* Linha com 3 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {top3.map((m, i) => <ModalityCard key={i} m={m} i={i} />)}
          </div>

          {/* Linha com 2 Cards Centralizados */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
             {/* Ocupa 1/5 do espaço para centralizar os próximos dois em um grid de 5 */}
             <div className="hidden lg:block"></div> 

             {/* Os 2 cards de baixo ocupam 2/5 do espaço */}
            {bottom2.map((m, i) => <div className="md:col-span-1 lg:col-span-2" key={i+3}><ModalityCard m={m} i={i+3} /></div>)}
            
            {/* Ocupa 1/5 do espaço para centralizar */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>
    );
  };


  const ScheduleSection = () => (
    <section id="horarios" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <p className="text-red-600 font-semibold uppercase mb-2">📅 Horários de Aulas</p>
        <h2 className="text-4xl font-extrabold text-white mb-12">
          Escolha Seu Melhor Horário
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.horarios.map((h, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-red-600 transition-all duration-300 group h-full flex flex-col"
            >
              {/* Imagem */}
              <div className="h-48 overflow-hidden bg-zinc-800">
                <img
                  src={h.image}
                  alt={h.modalidade}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Conteúdo */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-4xl mb-3">{h.icon}</div>
                <h3 className="text-2xl font-bold text-red-600 mb-3">{h.time}</h3>
                <p className="text-white font-semibold text-lg flex-grow">
                  {h.modalidade}
                </p>
                
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={scrollToContact}
                >
                  Agendar Aula
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-6 bg-red-600/10 border border-red-600/30 rounded-xl"
        >
          <p className="text-zinc-300 text-lg">
            <span className="text-red-600 font-bold">⏰ Segunda a Sexta:</span> Aulas conforme horários acima
            <br />
            <span className="text-red-600 font-bold">📍 Local:</span> Rua Andorinha, 164 - Sala 02, Caieiras/SP
          </p>
        </motion.div>
      </div>
    </section>
  );


  const PrivateLessonsSection = () => (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-red-600 font-semibold uppercase mb-2"
        >
          Aulas Particulares
        </motion.p>
  
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-extrabold text-white mb-8"
        >
          Aprendizado Personalizado e Acelerado
        </motion.h2>
  
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-lg mb-10"
        >
          Nossas aulas particulares são ideais para quem deseja evoluir **rapidamente**,
          focando em técnicas específicas ou aperfeiçoando o desempenho competitivo.
          Flexíveis, individuais ou em pequenos grupos, adaptadas ao seu ritmo e nível.
        </motion.p>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-4 flex-col sm:flex-row"
        >
          <a href={data.WHATSAPP_LINK + "?text=Quero%20saber%20mais%20sobre%20aulas%20particulares"} target="_blank" rel="noreferrer">
            <Button size="lg" className="w-full sm:w-auto">
              📞 Solicitar Orçamento de Aula Particular
            </Button>
          </a>
          <Button size="lg" variant="outline" onClick={scrollToContact} className="w-full sm:w-auto">
            🗓️ Agendar Aula Experimental
          </Button>
        </motion.div>
      </div>
    </section>
  );


 // ---------------------------------------------------------------------------
// Seção: Loja / Produtos - TAMANHO AJUSTADO
// ---------------------------------------------------------------------------
const StoreSection = () => {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <p className="text-red-600 font-semibold uppercase text-center mb-2">Vestuário</p>
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">
            Leve o orgulho da Equipe Galindo
        </h2>
        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-8">
          Na Galindo Store você encontra produtos oficiais: kimonos, camisetas, moletons, bonés e acessórios desenvolvidos com qualidade e identidade da nossa equipe. Cada peça foi pensada para conforto e estilo — vista Galindo e represente nossa história.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto"> 
          {data.produtos.map((produto, i) => (
            <motion.div
              key={produto.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-950 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-shadow duration-300 border border-zinc-800"
              whileHover={{ y: -5 }}
            >
              <div className="h-56 overflow-hidden"> 
                <img
                    src={produto.img}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center"> 
                <h3 className="text-xl font-semibold text-white mb-2">{produto.nome}</h3>
                <p className="text-zinc-400 mb-3 text-sm">{produto.desc}</p>
                <div className="flex justify-center pt-2">
                    <a href={data.WHATSAPP_LINK + `?text=Quero%20comprar%20o%20produto:%20${produto.nome}`} target="_blank" rel="noreferrer">
                        <Button size="sm" className="flex items-center gap-1">
                            <ShoppingBag className="w-4 h-4" /> Comprar
                        </Button>
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
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
            animate={{ height: isOpen ? 'auto' : 64 }}
            transition={{ duration: 0.3 }}
        >
            <button
                className="w-full text-left p-4 flex justify-between items-center bg-zinc-900 hover:bg-zinc-800 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-white font-semibold flex items-center">
                    <ChevronDown className={cn("w-5 h-5 mr-3 text-red-600 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
                    {title}
                </h3>
            </button>
            <div className={cn("p-4 border-t border-zinc-800", !isOpen && 'hidden')}>
                <p className="text-zinc-400 leading-relaxed pl-8">{content}</p>
            </div>
        </motion.div>
    );
  };

  const FAQSection = () => (
    <section className="py-24 bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p className="text-red-600 font-semibold uppercase mb-2">Dúvidas Frequentes</p>
        <h2 className="text-4xl font-extrabold text-white mb-12">
          Respostas Rápidas para Você
        </h2>
        <div className="space-y-4">
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
            className="mt-8 text-zinc-400"
        >
            Ainda tem dúvidas? <a href={data.WHATSAPP_LINK} className="text-red-600 hover:underline font-bold">Fale conosco pelo WhatsApp.</a>
        </motion.p>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section ref={contactRef} id="contato" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <p className="text-red-600 font-semibold uppercase text-center mb-2">Localização</p>
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
          Entre em Contato e Agende sua Aula
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-zinc-300"
          >
            <div className="flex items-start">
              <MapPin className="w-6 h-6 mr-4 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-lg font-semibold">
                        Rua Andorinha, 164, Laranjeiras, Caieiras/SP
                        <br />
                        <span className="text-zinc-500 font-normal text-sm">Próximo ao Ginásio Municipal.</span>
                      </p>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-4 text-red-600" />
                      <p className="text-lg font-semibold">(11) 9 6921-4329</p>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-4 text-red-600" />
                      <p className="text-lg font-semibold">equipegalindojiujitsu@yahoo.com</p>
            </div>
                    <div className="flex items-center space-x-4">
                      <a href="https://www.instagram.com/equipe_galindo/" target="_blank" rel="noreferrer" className="flex items-center hover:text-red-600 transition-colors">
                        <Instagram className="w-6 h-6 mr-3 text-red-600" />
                        <p className="text-lg font-semibold">@equipe_galindo</p>
                      </a>
                      <div className="flex items-center text-zinc-400">
                        <p className="text-sm">Facebook: Equipe Galindo Jiu Jitsu</p>
                      </div>
                      <div className="flex items-center text-zinc-400">
                        <p className="text-sm">YouTube: @EquipeGalindoJiuJitsu</p>
                      </div>
                    </div>

            <div className="pt-6 space-y-3">
                <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer">
                    <Button className="w-full text-lg h-12">
                        📞 Falar com Equipe Galindo (Recomendado)
                    </Button>
                </a>
            </div>
          </motion.div>

     <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full h-80 md:h-[450px] rounded-xl overflow-hidden shadow-2xl border border-zinc-700"
    >
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.295254924707!2d-46.8778401!3d-23.3644917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf078652d87e0b%3A0x6a0c5678b668d2f0!2sRua%20Andorinha%2C%20164%20-%20Caieiras%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700680000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Galindo Jiu-Jitsu"
        ></iframe>
    </motion.div>

        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="py-8 bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-zinc-500 text-sm">
        <p>
          © {new Date().getFullYear()} Galindo Jiu-Jitsu. Todos os direitos reservados. 🥋
        </p>
      </div>
    </footer>
  );

  const FixedWhatsappButton = () => (
    <motion.a
      href={data.WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Tooltip */}
      <div className="mb-2 bg-green-600 text-white text-xs font-semibold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
        Fale conosco!
      </div>
      
      {/* Botão principal */}
      <div className="relative p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300">
        <FaWhatsapp className="w-7 h-7" />
        
        {/* Anel animado */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-20"></div>
      </div>
    </motion.a>
  );

  // -----------------------------------------------------------------------------
  // Renderização Principal
  // -----------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased">
      {/* Banner de Urgência */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-red-700 text-white py-3 text-center text-sm font-bold tracking-wider"
      >
        <div className="container mx-auto px-4">
            <p className="flex justify-center items-center gap-2">
                <Zap className="w-4 h-4 animate-pulse" />
                Matrículas Abertas! <span className="underline ml-1 cursor-pointer" onClick={scrollToContact}>Fale conosco agora!</span>
            </p>
        </div>
      </motion.div>
      
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <ModalitiesSection /> 
        <TestimonialsSection />
        <ScheduleSection />
        <PrivateLessonsSection /> 
        <StoreSection /> {/* Produtos com tamanho ajustado */}
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <FixedWhatsappButton />
    </div>
  );
}