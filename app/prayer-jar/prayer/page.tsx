import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrayerJarFlow from "@/components/prayer-jar/PrayerJarFlow";

export default function PrayerPage() {
  return (
    <main className="min-h-screen bg-[#fcf8fb] text-[#1c1b1d] dark:bg-[#120d13] dark:text-[#fcf8fb]">
      <Navbar />
      <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-[1220px]">
          <PrayerJarFlow mode="prayer" />
        </div>
      </section>
      <Footer />
    </main>
  );
}