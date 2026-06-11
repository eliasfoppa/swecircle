import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Instagram, Phone } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Contact = () => {
  const { location } = useParams();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dynamically set contact details based on the current location
  const targetEmail = location === "lund" ? "lund@swecircle.com" : "uppsala@swecircle.com";
  
  // Set Instagram handle and link (Update the Lund one if your handle is different!)
  const targetInstaHandle = location === "lund" ? "@swecirclelund" : "@swecircle";
  const targetInstaLink = location === "lund" 
    ? "https://instagram.com/swecirclelund" 
    : "https://instagram.com/swecircle";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dynamically set the subject line so you know which city they are contacting
    const city = location ? location.charAt(0).toUpperCase() + location.slice(1) : "Uppsala";
    const subject = encodeURIComponent(`Contact Form Submission – Swecircle ${city}`);
    
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero-gradient section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
              Contact Swecircle
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-100">
              We welcome inquiries regarding donations, volunteering, or general questions about our work. Please get in touch using the form below or via the provided contact details.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground">
                  Whether you want to volunteer, collaborate with us, or learn more about our initiatives. We would love to hear from you!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <a
                      href={`mailto:${targetEmail}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <p>{targetEmail}</p>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Instagram</h3>
                    <a
                      href={targetInstaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {targetInstaHandle}
                    </a>
                  </div>
                </div>

                {/* Only display physical location and phones if the parameter is 'uppsala' (or default) */}
                {(!location || location === "uppsala") && (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Location</h3>
                        <p className="text-muted-foreground">
                          Rackis för Barn<br />
                          Rackarbergsgatan 32<br />
                          752 32 Uppsala<br />
                          Sweden
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Phone</h3>
                        <div className="text-muted-foreground space-y-1 mt-1">
                          <p>
                            <span className="font-medium">Rackarbergsgatan:</span>{" "}
                            <a href="tel:+46187013037" className="hover:text-primary transition-colors">
                              +46 18 7013037
                            </a>
                          </p>
                          <p>
                            <span className="font-medium">Flogsta:</span>{" "}
                            <a href="tel:+46850780682" className="hover:text-primary transition-colors">
                              +46 8 50780682
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Send a Message
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;