const express = require("express");
const app = express();
const path = require("path");

// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Middleware personnalisé pour vérifier l'heure de la requête
app.use((req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Dimanche) à 6 (Samedi)
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Autoriser l'accès pendant les heures de travail
  } else {
    res.send(
      "L'application web est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h)."
    );
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Accueil" });
});

app.get("/services", (req, res) => {
  res.render("services", { title: "Nos services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Nous contacter" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
