import React from "react";
import { Phone, User, Briefcase } from "lucide-react";
import "../styles/Contact.scss";

const contacts = [
    { id: 1, name: "Luis Fiandeiro", number: "+351 912 345 678", role: "Dono", image: "/luis.png" },
    { id: 2, name: "Candido", number: "+351 934 567 890", role: "Gerente", image: "/Candido.png" },
    { id: 3, name: "Abilio Matos", number: "+351 965 432 198", role: "Marketing", image: "/abilio.png" },
];

const Contact: React.FC = () => {
    return (
        <div className="contact">
            <h1>Contactos</h1>
            <div className="contact__list">
                {contacts.map((person) => (
                    <div key={person.id} className="contact__card">
                        <img src={person.image} alt={`Foto de ${person.name}`} className="contact__image" loading="lazy" />
                        <div className="contact__info">
                            <h2><User size={20} /> {person.name}</h2>
                            <p>
                                <Phone size={18} className="icon" /> {person.number}
                            </p>
                            <p>
                                <Briefcase size={18} className="icon" /> {person.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <section className="contact__location">
                <h1>Localização</h1>
                <div className="contact__map">
                    <img src="/mapafiandeiro.png" alt="Mapa de Puerto Esperanza" loading="lazy"/>
                    <p>📍 Estamos localizados em Puerto Esperanza, na zona norte da cidade.</p>
                </div>
            </section>
        </div>
    );
};

export default Contact;
