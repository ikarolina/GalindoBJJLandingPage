import React, { useState, useRef, useEffect } from "react";
import equipeImg from "./assets/imagens/equipe.jpeg";
import kimonoImg from "./assets/imagens/kimono.jpeg";
import moletomImg from "./assets/imagens/moletom.jpeg";
import camisaImg from "./assets/imagens/camiseta.jpeg";
import logoImg from "./assets/imagens/logo.jpg"; 
import { motion } from "framer-motion";
import {
  MessageCircle, ExternalLink, Instagram, Mail, Phone, MapPin, ShoppingBag,
  Zap, ShieldHalf, Dumbbell, Target, ChevronDown, Loader2, Menu, X, ArrowRight
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
         texto: "Como mulher, me sinto muito segura e acolhida. As aulas femininas mudaram minha vida.",
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
           resposta: "Apenas roupa confortável (bermuda e camiseta). O kimono para a aula experimental é fornecido pela academia." 
         },
         { 
             pergunta: "Vocês oferecem aulas particulares?", 
             resposta: "Sim! Oferecemos aulas particulares flexíveis, ideais para acelerar seu aprendizado e focar em técnicas específicas." 
           },
       ]
   };

// -----------------------------------------------------------------------------
// Componente Principal
// -----------------------------------------------------------------------------

export default function GalindoLandingPremium() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const contactRef = useRef(null); 

  // Função para rolar até o Contato
  const scrollToContact = () => {
    setIsNavOpen(false); 
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // -----------------------------------------------------------------------------
  // Componentes de Layout e Seções
  // -----------------------------------------------------------------------------

  const Navbar = () => (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center"
          >
            {/* NOVO: Usando a imagem da Logo */}
            <img 
                src={logoImg} 
                alt="Logo Galindo Jiu-Jitsu" 
                className="h-10 md:h-12 w-auto" 
            />
          </motion.div>
          {/* Mantive o texto da marca como extra, mas você pode remover se o logo já for completo */}
          <span className="text-xl md:text-2xl font-bold text-red-600 tracking-tight hidden sm:block">
            Galindo Jiu-Jitsu
          </span>
        </div>

        {/* Desktop CTAs */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={scrollToContact}>
            Agende Experimental
          </Button>
          <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isNavOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden border-t border-zinc-800"
      >
        <div className="flex flex-col p-4 space-y-3">
          <Button variant="default" onClick={scrollToContact} className="w-full">
            Quero minha Aula Experimental
          </Button>
          <a href={data.WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <Button variant="outline" className="w-full flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
            </Button>
          </a>
        </div>
      </motion.div>
    </header>
  );

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
            <h2 className="text-4xl font-extrabold text-white mb-6">
              O Legado da Equipe Galindo
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Desde **2012**, a Equipe Galindo Jiu-Jitsu é sinônimo de dedicação, excelência técnica e formação humana. 
              Sob a liderança do **Professor Galindo**, desenvolvemos atletas e cidadãos, com metodologia 
              comprovada e um ambiente familiar, seguro e acolhedor.
            </p>
            <ul className="text-zinc-300 text-lg space-y-2 list-none">
              <li className="flex items-center"><ChevronDown className="w-4 h-4 mr-3 text-red-600 rotate-[-90deg]" /> Treinos para todas as idades e níveis.</li>
              <li className="flex items-center"><ChevronDown className="w-4 h-4 mr-3 text-red-600 rotate-[-90deg]" /> Foco em desenvolvimento pessoal e técnico.</li>
              <li className="flex items-center"><ChevronDown className="w-4 h-4 mr-3 text-red-600 rotate-[-90deg]" /> Ambiente que promove respeito e união.</li>
            </ul>
            <div className="mt-8">
                <Button variant="default" onClick={scrollToContact}>
                    Agendar minha Visita
                </Button>
            </div>
          </motion.div>

          {/* Imagem com Efeito Visual Acentuado */}
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-red-600/10 bg-zinc-900 h-80 relative"
        >
            <img
                src={equipeImg}
                alt="Professor Galindo e Equipe"
                className="w-full h-full object-cover z-10 hover:scale-105 transition-transform duration-500"
            />
        </motion.div>
        </div>
      </div>
    </section>
  );

  const BenefitsSection = () => (
    <section className="py-24 bg-zinc-900">
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
    <section className="py-24 bg-zinc-950">
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
              <p className="text-5xl text-red-600 opacity-20 absolute top-4 left-4 font-serif">“</p>
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
        <p className="text-red-600 font-semibold uppercase text-center mb-2">Equipamentos</p>
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
            Vista a <span className="text-red-600">Garra</span> da Galindo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto"> 
          {/* Max-width e mx-auto para centralizar e dar respiro */}
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
              {/* Altura da imagem reduzida de h-64 para h-56 */}
              <div className="h-56 overflow-hidden"> 
                <img
                    src={produto.img}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center"> 
                {/* Padding reduzido de p-5 para p-4 */}
                <h3 className="text-xl font-semibold text-white mb-2">{produto.nome}</h3>
                <p className="text-zinc-400 mb-3 text-sm">{produto.desc}</p>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-red-600 font-extrabold text-xl">{produto.preco}</span>
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
    <section ref={contactRef} className="py-24 bg-zinc-950">
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
                Rua Andorinha, 164 - Sala 02, Caieiras/SP
                <br />
                <span className="text-zinc-500 font-normal text-sm">Próximo ao Ginásio Municipal.</span>
              </p>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-4 text-red-600" />
              <p className="text-lg font-semibold">(11) 9 6921-4329 (WhatsApp)</p>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-4 text-red-600" />
              <p className="text-lg font-semibold">equipegalindojiujitsu@yahoo.com</p>
            </div>
            <a href="https://www.instagram.com/equipe_galindo/" target="_blank" rel="noreferrer" className="flex items-center hover:text-red-600 transition-colors">
              <Instagram className="w-6 h-6 mr-4 text-red-600" />
              <p className="text-lg font-semibold">@equipe_galindo</p>
              <ExternalLink className="w-4 h-4 ml-2 text-zinc-500" />
            </a>

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
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/50 hover:bg-green-600 transition-all duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-6 h-6" />
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