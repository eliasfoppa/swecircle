import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
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

  const rowClass = "grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-x-4 border-t border-border py-4";

  return (
    <Layout>
      <PageHeader
        title="Contact Swecircle"
        intro="We welcome inquiries regarding donations, volunteering, or general questions about our work."
      />

      <section className="section-padding">
        <div className="container grid lg:grid-cols-12 gap-x-8 gap-y-14">
          {/* Contact Info */}
          <div className="lg:col-span-6">
            <h2 className="display-2 mb-5">Get in touch</h2>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Whether you want to volunteer, collaborate with us, or learn more about our initiatives, we would love to hear from you!
            </p>

            <dl className="border-b border-border">
              <div className={rowClass}>
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${targetEmail}`} className="link-rule">{targetEmail}</a>
                </dd>
              </div>

              <div className={rowClass}>
                <dt className="text-muted-foreground">Instagram</dt>
                <dd>
                  <a href={targetInstaLink} target="_blank" rel="noopener noreferrer" className="link-rule">
                    {targetInstaHandle}
                  </a>
                </dd>
              </div>

              {/* Only display physical location and phones if the parameter is 'uppsala' (or default) */}
              {(!location || location === "uppsala") && (
                <>
                  <div className={rowClass}>
                    <dt className="text-muted-foreground">Location</dt>
                    <dd>
                      Swecircle<br />
                      c/o Jacob Lehmann<br />
                      Djäknegatan 17, Lgh 1302<br />
                      754 23 Uppsala<br />
                      Sweden
                    </dd>
                  </div>

                  <div className={rowClass}>
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd className="space-y-1">
                      <p>
                        Rackarbergsgatan:{" "}
                        <a href="tel:+46187013037" className="link-rule whitespace-nowrap">+46 18 7013037</a>
                      </p>
                      <p>
                        Flogsta:{" "}
                        <a href="tel:+46850780682" className="link-rule whitespace-nowrap">+46 8 50780682</a>
                      </p>
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">Send a message</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="field"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="field"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="field resize-none"
                  placeholder="Write your message here..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">Send message</Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
