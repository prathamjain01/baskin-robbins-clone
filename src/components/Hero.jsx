import React from "react";
import bag from "../assets/hero-bag.webp";
import jarRight from "../assets/jar-right.png";
import cone from "../assets/cone.png";
import scoop1 from "../assets/scoop-small-1.png";
import scoop2 from "../assets/scoop-small-2.png";
import scoop3 from "../assets/scoop-small-3.png";
import sprinkles from "../assets/sprinkles.png";

/**
 * Updated Hero with improved bag glow, float, wobble, and slightly larger bag.
 */

export default function Hero() {
  return (
    <section
      className="relative overflow-visible bg-[#f6f2ef] hero-vignette w-full"
      aria-label="Hero section"
    >
      <div className="w-full px-10 mx-auto pt-10 pb-6 relative">
        {/* Top small row (left text, center bag cluster, right small box) */}
        <div className="w-full px-10 grid grid-cols-12 items-start gap-4 relative z-30">
          {/* Left small text block */}
          <div className="col-span-12 lg:col-span-3 flex lg:items-start items-center lg:justify-start justify-center">
            <div className="w-max-xl py-50 text-left">
              <p className="text-4xl text-[#4b4643] leading- font-bold ">
                Produces only quality ingredients, tries to support socially important topics and uses less plastic in packaging.
              </p>
              <button className="mt-4 bg-[#3b1a13] text-white px-4 py-2 rounded-full text-sm shadow-md">
                Our Catalogue
              </button>
            </div>
          </div>

          {/* CENTER — floating bag + small round badge */}
          <div className="col-span-12 lg:col-span-6 flex justify-center items-center relative">
            {/* ====== BAG CONTAINER (upgraded: size boost, glow, float, hover wobble) ====== */}
            <div
              className="relative py-60
                         w-[300px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[600px] 
                         flex items-center justify-center"
              aria-hidden="true"
            >
              {/* glow behind the bag */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bag-glow" />
              </div>

              {/* bag image: larger, floating, hover wobble + responsive rotate/scale/tweak */}
              <img
                src={bag}
                alt="Product bag"
                className={
                  "bag-img " +
                  "transform " +
                  // small
                  "sm:-rotate-6 sm:scale-[1.10] sm:-translate-y-2 " +
                  // medium
                  "md:-rotate-10 md:scale-[1.16] md:-translate-y-4 " +
                  // large
                  "lg:-rotate-12 lg:scale-[1.20] lg:-translate-y-6 " +
                  // extra large slight revert / fine-tune
                  "xl:-rotate-6 xl:scale-[1.22] xl:-translate-y-8 " +
                  // animations
                  "drop-shadow-2xl z-40 transition-transform duration-700 ease-out " +
                  // our CSS animation classes (bag floats by default; wobble on hover)
                  "bag-float bag-hover-wobble"
                }
                style={{
                  transformOrigin: "center bottom",
                }}
              />
            </div>
          </div>

          {/* Right small card */}
          <div className="col-span-12 lg:col-span-3 py-50 flex lg:items-start items-center lg:justify-end justify-center">
            <div className="w-80 h-80 bg-white rounded-lg shadow p-3 flex flex-col items-center justify-center text-center z-40">
              <img src={jarRight} alt="jar" className="w-40 h-auto mb-2" />
              <div className="text-xl  text-[#4b4643]">Our unique production is 100% healthy</div>
              <div className="mt-2">
                <button className="w-8 h-8 rounded-full bg-[#3b1a13] text-white flex items-center justify-center text-xs">●</button>
              </div>
            </div>
          </div>
        </div>

        {/* The giant brand word / center large text */}
        {/* NOTE: z-index is intentionally low so product images overlap HANCI */}
        <div className="w-full mt-6 flex justify-center relative z-0 pointer-events-none">
          <h2
            className="hero-giant text-[7.4rem] md:text-[10.5rem] lg:text-[13.5rem] xl:text-[16rem] text-[#3b1a13] tracking-tight m-0 select-none leading-none"
            style={{
              letterSpacing: "-10px",
              // offset the big text slightly up so it visually sits behind the product cluster
              transform: "translateY(18px) translateX(-6px)",
            }}
          >
            BASKIN ROBINS
          </h2>
        </div>

        <div className="w-full text-center mt-2 mb-10 z-10">
          <div className="text-xl text-[#6b6460] uppercase tracking-widest">BEST FLAVOUR OF YOUR FRESHNESS</div>
        </div>

        {/* background decor sprinkles near edges */}
        <img
          src={sprinkles}
          alt=""
          className="hidden lg:block absolute left-6 top-[40%] w-20 opacity-90 z-10 pointer-events-none"
        />
        <img
          src={sprinkles}
          alt=""
          className="hidden lg:block absolute right-6 top-[55%] w-24 opacity-90 z-10 pointer-events-none"
        />
      </div>

      {/* Mid section: big cone on left + descriptive text on right (mirrors reference) */}
      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-12 items-center gap-8 mt-8 relative z-30 px-6 pb-12">
          {/* Left: big rotating cone + small scoops around */}
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-start relative">
            <div className="relative w-[520px] md:w-[640px] lg:w-[760px]">
              <img
                src={cone}
                alt="cone"
                className="w-full drop-shadow-2xl z-20 transition-transform duration-500"
              />
              {/* small scoops around */}
              <img src={scoop1} alt="" className="absolute -left-10 -top-8 w-14 h-auto drop-shadow-md z-30" />
              <img src={scoop2} alt="" className="absolute right-6 top-6 w-12 h-auto drop-shadow-sm z-30" />
              <img src={scoop3} alt="" className="absolute -right-12 bottom-[-24px] w-16 h-auto drop-shadow-lg z-30" />
            </div>
          </div>

          {/* Right: explanatory text + CTA like reference */}
          <div className="col-span-12 lg:col-span-6">
            <div className="max-w-lg ml-auto lg:ml-0">
              <h3 className="text-3xl md:text-4xl font-serif text-[#3b1a13]">The result is a smooth and semi-solid foam</h3>
              <p className="mt-4 text-[#6b6460]">
                Food coloring is sometimes added, in addition to stabilizers. The mixture is cooled below the freezing point of water and stirred to incorporate air spaces and to prevent detectable ice crystals from forming.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button className="bg-[#3b1a13] text-white px-6 py-3 rounded-full shadow">Buy Now</button>
                <a className="text-[#3b1a13] underline">View Ingredients</a>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  );
}
