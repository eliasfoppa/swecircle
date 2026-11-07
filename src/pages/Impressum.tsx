import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";

const Impressum = () => {
  return (
    <Layout>
      <PageHeader title="Impressum" />
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl space-y-10 text-foreground/80">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                Website Operator
              </h2>
              <p>
                Swecircle<br />
                c/o Jacob Lehmann<br />
                Djäknegatan 17, Lgh 1302<br />
                754 23 Uppsala<br />
                Sweden
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                Contact Information
              </h2>
              <p>
                Email: <a href="mailto:uppsala@swecircle.com" className="link-rule text-primary">uppsala@swecircle.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                Board Members
              </h2>
              <p>
                President: Jacob Lehmann<br />
                Vice President & Treasurer: Elias Foppa<br />
                Secretary: Lea Poewe
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                Organization Type
              </h2>
              <p>
                Swecircle is a student-run nonprofit organization registered in Sweden. All proceeds go to Riksförbundet för Rörelsehindrade Barn och Ungdomar (RBU).
              </p>
              <br />
              <p>
                Organisationsnummer: 802554-2773
              </p>
            </section>

            {/* New Section for Stadgar */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                Stadgar (Bylaws)
              </h2>
              <p>
                Our association statutes (stadgar) outline the rules, purpose, and governance of Swecircle. You can view or download the complete official document below.
              </p>
              <div className="mt-4 not-prose">
                <a 
                  href="/stadgar.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-5 font-semibold text-primary-foreground bg-primary hover:bg-foreground transition-colors"
                >
                  View Official Stadgar (PDF)
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impressum;
