import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ArthurCV = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl font-bold text-primary flex items-center"
            >
              <span className="mr-2">👨‍💻</span>
              Arthur CRIERE
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex space-x-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {['accueil', 'apropos', 'formation', 'competences', 'projets', 'contact'].map((item, index) => (
                <motion.button
                  key={item}
                  variants={slideInFromRight}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item
                      ? 'text-primary bg-primary/10 shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block h-0.5 w-6 bg-foreground transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 w-6 bg-foreground opacity-100 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-foreground transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 space-y-2 overflow-hidden"
              >
                {['accueil', 'apropos', 'formation', 'competences', 'projets', 'contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full px-4 py-3 text-left rounded-lg transition-all duration-300 ${
                      activeSection === item
                        ? 'text-primary bg-primary/10 shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            >
              <span className="text-5xl text-white font-bold">AC</span>
            </motion.div>
            
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Arthur <span className="text-primary">CRIERE</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Étudiant en BTS SIO - Administration Réseau
            </motion.p>
            
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                📧 Me contacter
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('competences')}
                className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                💻 Mes compétences
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">À Propos de Moi</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/hwhost.png" 
                  alt="Portrait professionnel d'Arthur CRIERE, étudiant en BTS SIO"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              
              <div className="space-y-6">
                <p className="text-lg">
                  Passionné par l'informatique et les technologies réseau, je suis actuellement étudiant en 
                  BTS Services Informatiques aux Organisations option Solutions d'Infrastructure, Systèmes et Réseaux.
                </p>
                
                <p className="text-lg">
                  Mon objectif est de devenir administrateur réseau et de contribuer à la construction 
                  d'infrastructures informatiques robustes et sécurisées.
                </p>
                
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    variants={scaleUp}
                    className="p-4 bg-background rounded-lg text-center shadow-lg border border-border/50"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="text-2xl font-bold text-primary">🎓 BTS SIO</div>
                    <div className="text-sm text-muted-foreground">En cours</div>
                  </motion.div>
                  <motion.div 
                    variants={scaleUp}
                    className="p-4 bg-background rounded-lg text-center shadow-lg border border-border/50"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="text-2xl font-bold text-primary">🌐 Réseau</div>
                    <div className="text-sm text-muted-foreground">Spécialisation</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formation Section */}
      <section id="formation" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Formation</h2>
            
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 bg-muted/50 rounded-lg border-l-4 border-primary"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">BTS SIO - Option SISR</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">2023 - 2025</span>
                </div>
                <p className="text-muted-foreground">
                  Brevet de Technicien Supérieur Services Informatiques aux Organisations, 
                  spécialité Solutions d'Infrastructure, Systèmes et Réseaux.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 bg-muted/50 rounded-lg border-l-4 border-green-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">Baccalauréat Général</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">2020 - 2023</span>
                </div>
                <p className="text-muted-foreground">
                  Baccalauréat général avec spécialités Mathématiques et Numérique et Sciences Informatiques.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compétences Section */}
      <section id="competences" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Compétences Techniques</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Réseau */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 bg-background rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">Réseaux</h3>
                <div className="space-y-3">
                  {['TCP/IP', 'DNS', 'DHCP', 'VPN', 'LAN/WAN', 'Sécurité réseau'].map((skill, index) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Systèmes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 bg-background rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-emerald-400">Systèmes</h3>
                <div className="space-y-3">
                  {['Windows Server', 'Linux', 'Active Directory', 'Virtualisation', 'Backup'].map((skill, index) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Développement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 bg-background rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Développement</h3>
                <div className="space-y-3">
                  {['HTML/CSS', 'JavaScript', 'Python', 'Bash', 'SQL'].map((skill, index) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Outils */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-6 bg-background rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-pink-400">Outils</h3>
                <div className="space-y-3">
                  {['Wireshark', 'VMware', 'Cisco Packet Tracer', 'Git', 'Docker'].map((skill, index) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-3" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projets Section */}
      <section id="projets" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projets & Expériences</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-background rounded-lg overflow-hidden shadow-sm border"
              >
                <img 
                  src="https://placeholder-image-service.onrender.com/image/400x200?prompt=Réseau informatique avec serveurs et câblage structuré&id=projet-reseau-001&customer_id=cus_T4VD2208WwMh0J" 
                  alt="Configuration d'un réseau local avec serveurs et équipements Cisco"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Configuration Réseau Entreprise</h3>
                  <p className="text-muted-foreground mb-4">
                    Mise en place d'une infrastructure réseau complète avec VLAN, sécurité et monitoring.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">Cisco</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">VLAN</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">Sécurité</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-background rounded-lg overflow-hidden shadow-sm border"
              >
                <img 
                  src="https://placeholder-image-service.onrender.com/image/400x200?prompt=Serveur Linux avec terminal et interface d'administration&id=projet-linux-001&customer_id=cus_T4VD2208WwMh0J" 
                  alt="Serveur Linux Ubuntu avec interface de ligne de commande et outils d'administration"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Administration Serveur Linux</h3>
                  <p className="text-muted-foreground mb-4">
                    Configuration et maintenance d'un serveur Ubuntu avec services web et base de données.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">Ubuntu</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">Apache</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">MySQL</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Me contacter</h3>
                <p className="text-muted-foreground">
                  N'hésitez pas à me contacter pour discuter de projets ou d'opportunités dans le domaine de l'administration réseau.
                </p>
                
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary text-lg">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">arthur.criere@email.com</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary text-lg">📱</span>
                    </div>
                    <div>
                      <div className="font-semibold">Téléphone</div>
                      <div className="text-muted-foreground">+33 6 12 34 56 78</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary text-lg">📍</span>
                    </div>
                    <div>
                      <div className="font-semibold">Localisation</div>
                      <div className="text-muted-foreground">Paris, France</div>
                    </div>
                  </motion.div>

                  {/* Liens sociaux */}
                  <motion.div 
                    className="flex space-x-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.a
                      href="https://github.com/arthurcriere"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-primary">🐱</span>
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/arthurcriere"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-primary">💼</span>
                    </motion.a>
                    <motion.a
                      href="https://twitter.com/arthurcriere"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-primary">🐦</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre message..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={() => alert('Formulaire soumis ! En production, cela enverrait un email.')}
                  >
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div 
            className="text-center text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg mb-4">© 2024 Arthur CRIERE. Tous droits réservés.</p>
            <p className="text-sm mb-6">Développé avec React, TypeScript et Tailwind CSS</p>
            
            <motion.div 
              className="flex justify-center space-x-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="https://github.com/arthurcriere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                variants={scaleUp}
                whileHover={{ scale: 1.1 }}
              >
                GitHub
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/arthurcriere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                variants={scaleUp}
                whileHover={{ scale: 1.1 }}
              >
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default ArthurCV;
