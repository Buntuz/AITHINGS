//import video1 from "@/assets/video1.mp4";
//import video2 from "@/assets/video2.mp4";
//https://www.npmjs.com/package/react-type-animation
import { motion , useAnimation} from "framer-motion"
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import dynamic from 'next/dynamic';

import { useInView } from "react-intersection-observer";

import React, { useEffect } from "react";

const variants = {
    hidden: { opacity: 0, x: -1000 },
    visible: { opacity: 1, x: 0 },
  };

  const AnimatedNumbers = dynamic(
    () => 
     {
      return import ("react-animated-numbers");
      }, 
      {ssr: false}
  );


  const images = [
    { src: '/assets/images/ai.jpg', alt: 'First Image' },
    { src: '/assets/images/datascience.jpg', alt: 'Second Image' }
  ];

const HeroSection = () => {

const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };  

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
      <TypeAnimation
                            sequence={[
                            // Same substring at the start will only be typed out once, initially
                            'Technology',
                            2000, // wait 1s before replacing "Mice" with "Hamsters"
                            'AI',
                            3000,
                            'Data Science',
                            3000,
                            'IOT',
                            3000
                            ]}
                            wrapper="span"
                            speed={50}
                            
                            repeat={Infinity}
                        />

        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          for you.
        </span>
      </h1>
      <div ref={ref} className="mb-8 w-full md:w-3/4 lg:w-1/2">
        <motion.h1 
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
        className="text-4xl font-bold mb-4 mt-10  text-center text-neutral-500 max-w-4xl">
            Transform Your Business with Cutting-Edge Technology Solutions
        </motion.h1>
      </div>
      
      
      <motion.p
          className="text-lg mb-8"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          Empower your creativity and drive your business forward with our innovative AI solutions, data science for insightful decisions, IoT connectivity, and cutting-edge mobile apps. Get started today and turn your ideas into impactful reality!
        </motion.p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          Documentation
        </a>
      </div>


      <div className="flex mt-10 justify-center">
       
        
      {/*
        <motion.div
            className="box rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"]
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
            }}
            
            />

            <motion.div
                initial={{ x: -1000 }}   // Start position (off-screen to the left)
                animate={{ x: 0 }}       // End position (center of the screen)
                transition={{
                    type: 'spring',        // Type of animation
                    stiffness: 50,         // Spring stiffness
                    damping: 20,           // Spring damping
                    duration: 2,           // Duration of the animation
                    repeat: Infinity,      // Repeat the animation indefinitely
                    repeatType: 'reverse'  // Reverse the animation direction on repeat
                }}
                >
                <Image src="/assets/images/banner-bg.png" 
                        alt="IMAGE" 
                        width={100} // specify the width
                        height={100} // specify the height
                        className="h-32 w-32 object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-105" />
                </motion.div>


                <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                <img src="/path/to/your/image.jpg" alt="Animated" />
              </motion.div> */}

              <motion.img src="/assets/images/ai.jpg" 
                        alt="IMAGE" 
                        initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 * 0.3 }}
                        width={300} // specify the width
                        height={300} // specify the height
                        className="shadow-sm shadow-orange-400 mx-2 my-4 h-60 w-60 object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-105" />

                <Image src="/assets/images/datascience.jpg" 
                        alt="IMAGE" 
                        width={300} // specify the width
                        height={300} // specify the height
                        className="shadow-sm shadow-orange-400 mx-2 my-4 h-60 w-60 object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-105" />
                
      </div>
    </div>
  );
};

export default HeroSection;