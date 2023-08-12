import React from "react";
import "./contact.scss";

export default function Contact() {
    return (
        <div className="contacto">
            <div className="heading" id="separador">
                <img
                    src="./images/titulo-encabezado.png"
                    alt="encabezado"
                ></img>
                <h3>Contacts</h3>
            </div>

            <div className="row">
                <iframe
                    data-aos="fade-up"
                    data-aos-delay="150"
                    className="mapa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.251009001743!2d106.6530182757524!3d10.792077358903407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293529c8f155%3A0xc101e984845bad65!2zNDIgVOG7sSBDxrDhu51uZywgUGjGsOG7nW5nIDQsIFTDom4gQsOsbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1691379947783!5m2!1svi!2s"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
                <div className="form">
                    <div className="iconos-container">
                        <div
                            className="iconos"
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >
                            <i className="fas fa-map"></i>
                            <h3>How to get there</h3>
                            <p>42 Tự Cường</p>
                        </div>

                        <div
                            className="iconos"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <i className="fas fa-envelope"></i>
                            <h3>Email :</h3>
                            <p>Fastfood@gmail.com</p>
                        </div>

                        <div
                            className="iconos"
                            data-aos="fade-up"
                            data-aos-delay="450"
                        >
                            <i className="fas fa-phone"></i>
                            <h3>Telephones :</h3>
                            <p>0123456789</p>
                        </div>
                    </div>

                    <form action="">
                        <input
                            data-aos="fade-up"
                            data-aos-delay="150"
                            type="text"
                            placeholder="Nombre completo"
                            className="cajas"
                        />
                        <input
                            data-aos="fade-up"
                            data-aos-delay="300"
                            type="email"
                            placeholder="Correo electronico"
                            className="cajas"
                        />
                        <input
                            data-aos="fade-up"
                            data-aos-delay="450"
                            type="number"
                            placeholder="Telefono"
                            className="cajas"
                        />
                        <textarea
                            data-aos="fade-up"
                            data-aos-delay="600"
                            name=""
                            placeholder="Escriba un mensaje"
                            className="cajas"
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                        <button
                            data-aos="fade-up"
                            data-aos-delay="750"
                            type="submit"
                            value="Enviar mensaje"
                            className="btn"
                        >
                            send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
