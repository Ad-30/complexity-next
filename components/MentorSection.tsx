import Image from 'next/image'
import ShineBorder from './ui/shine-border'

export default function MentorSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 bg-background">

        {/* <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-cyan-500/30"> */}
        <ShineBorder
          className="relative flex  max-w-3xl mx-auto flex-col items-center justify-center overflow-hidden border bg-gray-900 md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <div className="text-center mb-8">
            <Image
              src="/mentor.jpg"
              alt="Ms. Shikha Gautam"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-cyan-400">Ms. Shikha Gautam</h3>
            <p className="text-gray-400">Dy HOD, Computer Engineering</p>
            <p className="text-gray-500">PIET, Jaipur</p>
          </div>
          <blockquote className="text-gray-300 text-center italic">
            &quot;ComplexiPy bridges the gap between theory and practice in computer science. It&apos;s an essential tool for mastering complex algorithms and code optimization.&quot;
          </blockquote>
        </ShineBorder>

        {/* </div> */}
      </div>
    </section >
  )
}

