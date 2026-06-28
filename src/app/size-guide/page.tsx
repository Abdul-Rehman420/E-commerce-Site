import { Container } from "@/components/ui/Container";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const measurements: Record<string, { chest: string; length: string; sleeve: string }> = {
  XS: { chest: "34-36", length: "26", sleeve: "31" },
  S: { chest: "36-38", length: "27", sleeve: "32" },
  M: { chest: "38-41", length: "28", sleeve: "33" },
  L: { chest: "42-45", length: "29", sleeve: "34" },
  XL: { chest: "46-49", length: "30", sleeve: "35" },
  XXL: { chest: "50-53", length: "31", sleeve: "36" },
};

export default function SizeGuidePage() {
  return (
    <div className="pt-12 pb-24">
      <Container>
        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight font-medium text-navy mb-4">
            Size Guide
          </h1>
          <p className="text-navy/60 text-sm font-light max-w-lg">
            Find your perfect fit. Measurements are in inches.
          </p>
        </div>

        <div className="overflow-x-auto mb-16">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-navy/20">
                <th className="text-left py-4 px-4 font-medium text-navy">Size</th>
                <th className="text-left py-4 px-4 font-medium text-navy">Chest (in)</th>
                <th className="text-left py-4 px-4 font-medium text-navy">Length (in)</th>
                <th className="text-left py-4 px-4 font-medium text-navy">Sleeve (in)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size} className="border-b border-navy/10">
                  <td className="py-4 px-4 font-medium text-navy">{size}</td>
                  <td className="py-4 px-4 text-navy/70">{measurements[size].chest}</td>
                  <td className="py-4 px-4 text-navy/70">{measurements[size].length}</td>
                  <td className="py-4 px-4 text-navy/70">{measurements[size].sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-xl font-medium text-navy mb-4">How to Measure</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-sm font-medium text-navy mb-1">Chest</h3>
                <p className="text-xs text-navy/60 leading-relaxed">
                  Measure around the fullest part of your chest, keeping the tape parallel to the floor.
                </p>
              </li>
              <li>
                <h3 className="text-sm font-medium text-navy mb-1">Length</h3>
                <p className="text-xs text-navy/60 leading-relaxed">
                  Measure from the highest point of the shoulder to the bottom hem.
                </p>
              </li>
              <li>
                <h3 className="text-sm font-medium text-navy mb-1">Sleeve</h3>
                <p className="text-xs text-navy/60 leading-relaxed">
                  Measure from the center back of the neck to the shoulder point and down to the wrist.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-xl font-medium text-navy mb-4">Fit Notes</h2>
            <ul className="space-y-3 text-xs text-navy/60 leading-relaxed">
              <li>&bull; Our tees and sweatshirts run true to size for a regular fit.</li>
              <li>&bull; Hoodies are cut for a slightly relaxed, comfortable fit.</li>
              <li>&bull; &quot;Vintage Wash&quot; styles are pre-shrunk for consistent sizing.</li>
              <li>&bull; If between sizes, we recommend sizing up for a looser fit.</li>
              <li>&bull; Accessories like caps are one size fits all (OSFA) with an adjustable strap.</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
