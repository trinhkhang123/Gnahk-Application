import React from "react";

export default function About() {
    return (
        <section id="about" className="dark-bg">
            <div className="flex">
                <div className="flex-full">
                    <AboutCard
                        title="Smart Contract"
                        icon="/icons/design.svg"
                        description="I create contract products decentralized world."
                        projects={7} />
                    <AboutCard
                        title="Java Developer"
                        icon="/icons/code.svg"
                        description="I develop Back-end with coding super safety and speed."
                        projects={10} />
                    {/* <AboutCard
                        title="Mobile"
                        icon="/icons/phone.svg"
                        description="I develop cross-platform mobile applications."
                        projects={7} /> */}
                </div>
                
                <div className="flex-full about-text">
                    <h5 className="gray">Introduce</h5>
                    <h1 className="white">Hello, I'm Group Three</h1>
                    <h3 className="white">Thank you for visiting!</h3>
                </div>
            </div>

            <div className="flex partners justify-space">
                {/* <img src="/images/partners/wallety.png" height="45" width="180" alt="wallety" />
                <img src="/images/partners/artisty.png" height="45" width="180" alt="artisty" />
                <img src="/images/partners/khedma-lik.png" height="45" width="180" alt="khedma-lik" />
                <img src="/images/partners/directy.png" height="45" width="180" alt="directy" />
                <img src="/images/partners/telefy.png" height="45" width="180" alt="telefy" /> */}
            </div>
        </section>
    )
}

function AboutCard({ title, icon, description, projects }) {
    return (
        <div className="light-bg about-card">
            <div className="flex justify-space">
                <h3 className="green">{title}</h3>
                <img src={icon} width="28" height="28" alt={title} />
            </div>
            <p className="white">{description}</p>
            <span className="gray">{projects.toString()} projects</span>
        </div>
    )
}