import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowRight } from "lucide-react";

const volumeData = [
  { date: "Jul", futures: 480000, options: 120000 },
  { date: "Aug", futures: 510000, options: 140000 },
  { date: "Sep", futures: 620000, options: 180000 },
  { date: "Oct", futures: 560000, options: 150000 },
  { date: "Nov", futures: 530000, options: 130000 },
  { date: "Dec", futures: 490000, options: 110000 },
  { date: "Jan", futures: 580000, options: 160000 },
  { date: "Feb", futures: 640000, options: 190000 },
  { date: "Mar", futures: 700000, options: 210000 },
  { date: "Apr", futures: 660000, options: 195000 },
  { date: "May", futures: 590000, options: 170000 },
  { date: "Jun", futures: 610000, options: 180000 },
  { date: "Jul", futures: 680000, options: 200000 },
  { date: "Aug", futures: 720000, options: 220000 },
  { date: "Sep", futures: 750000, options: 230000 },
  { date: "Oct", futures: 690000, options: 205000 },
  { date: "Nov", futures: 640000, options: 185000 },
  { date: "Dec", futures: 600000, options: 165000 },
  { date: "Jan '26", futures: 670000, options: 200000 },
  { date: "Feb '26", futures: 710000, options: 215000 },
  { date: "Mar '26", futures: 760000, options: 235000 },
  { date: "Apr '26", futures: 730000, options: 225000 },
  { date: "May '26", futures: 680000, options: 200000 },
];

const tradingHours = [
  {
    venue: "CME Globex:",
    lines: [
      "Sunday 6:00 p.m. – Friday 5:00 p.m. ET (5:00 p.m. – 4:00 p.m. CT) with a daily maintenance period from 5:00 p.m. – 6:00 p.m. ET (4:00 p.m. – 5:00 p.m. CT)",
      "TACO: Sunday – Friday 6:00 p.m. – 9:30 a.m. ET  Monday – Friday 11:00 a.m. – 5:00 p.m. ET",
      "BTIC: Sunday – Friday 6:00 p.m. – 4:00 p.m. ET",
      "TMAC: Sunday – Friday 6:00 p.m. – 4:00 p.m. ET",
    ],
  },
  {
    venue: "CME ClearPort:",
    lines: [
      "Sunday 6:00 p.m. – Friday 6:45 p.m. ET (Sun 5:00 – Fri 5:45 p.m. CT) with no reporting Monday – Thursday 6:45 p.m. – 7:00 p.m. ET (5:45 p.m. – 6:00 p.m. CT)",
      "TACO: Sunday – Friday 6:00 p.m. – 9:30 a.m. ET and Monday – Friday 11:00 a.m. – 5:00 p.m. ET",
      "BTIC: Sunday – Friday 6:00 p.m. – 4:00 p.m. ET. BTICs for the following trading day can be submitted after 7:00 p.m. ET (6:00 p.m. CT)",
      "TMAC: Sunday – Friday 6:00 p.m. – 4:00 p.m. ET. TMACs for the following trading day can be submitted after 7:00 p.m. ET (6:00 p.m. CT)",
    ],
  },
];

function Label({ text }: { text: string }) {
  return (
    <p className="text-[#3A464F] text-[11px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
      {text}
    </p>
  );
}

export default function ExploreSection() {
  return (
    <section className="w-full bg-white border-t border-[#D9E0E5] py-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[#3A464F] text-[28px] font-light mb-8">
          Explore this product in depth
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Contract Highlights Card */}
          <div className="lg:w-[380px] shrink-0 border border-[#D9E0E5] p-6 bg-white">
            <h3 className="text-[#3A464F] text-[17px] font-semibold mb-5">
              Review contract highlights
            </h3>

            {/* Contract Unit */}
            <div className="mb-4">
              <Label text="Contract Unit" />
              <p className="text-[#5A6874] text-[14px]">$20 x Nasdaq-100 Index</p>
            </div>

            {/* Price Quotation */}
            <div className="mb-4">
              <Label text="Price Quotation" />
              <p className="text-[#5A6874] text-[14px]">U.S. dollars and cents per index point</p>
            </div>

            {/* Product Code */}
            <div className="mb-4">
              <Label text="Product Code" />
              <div className="text-[#5A6874] text-[14px] space-y-0.5">
                <p>CME Globex: <span className="font-semibold text-[#3A464F]">NQ</span>&nbsp;&nbsp;&nbsp;Clearing: NOBTIC: <span className="font-semibold text-[#3A464F]">NQT</span></p>
                <p>CME ClearPort: <span className="font-semibold text-[#3A464F]">NQ</span>&nbsp;&nbsp;&nbsp;TACO: NQQTMAC: <span className="font-semibold text-[#3A464F]">NQX</span></p>
              </div>
            </div>

            {/* Trading Hours */}
            <div className="mb-5">
              <Label text="Trading Hours" />
              {tradingHours.map((section, i) => (
                <div key={i} className="mb-3">
                  <p className="text-[#3A464F] text-[13px] font-semibold">{section.venue}</p>
                  {section.lines.map((line, j) => (
                    <p key={j} className="text-[#5A6874] text-[13px] leading-relaxed mt-1">{line}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* View full contract specs */}
            <a
              href="#"
              className="flex items-center gap-1 text-[#006EB6] text-[13px] font-semibold hover:underline"
            >
              <ArrowRight size={14} />
              View full contract specs
            </a>

            <p className="text-[#5A6874] text-[11px] mt-3 italic">
              Last Updated 11 May 2026 09:30:12 PM CT
            </p>
          </div>

          {/* Right: Daily Volume Chart */}
          <div className="flex-1 border border-[#D9E0E5] bg-white p-6">
            <a
              href="#"
              className="flex items-center gap-1 text-[#3A464F] text-[16px] font-semibold hover:text-[#006EB6] mb-6"
            >
              Daily Volume <ArrowRight size={16} />
            </a>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData} barSize={10} barGap={1}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#5A6874" }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "DATE", position: "insideBottom", offset: -2, style: { fontSize: 10, fill: "#5A6874", textAnchor: "middle" } }}
                  height={40}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#5A6874" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  width={50}
                  label={{ value: "VOL", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "#5A6874" } }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    value.toLocaleString(),
                    name === "futures" ? "Future Volume" : "Options Volume",
                  ]}
                  contentStyle={{ fontSize: 12, borderColor: "#D9E0E5" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) =>
                    value === "futures" ? "Future Volume" : "Options Volume"
                  }
                  wrapperStyle={{ fontSize: 12, color: "#5A6874" }}
                />
                <Bar dataKey="futures" fill="#1B3A6B" radius={[2, 2, 0, 0]} />
                <Bar dataKey="options" fill="#25A9E0" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
