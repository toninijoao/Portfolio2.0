"use client";

import { motion } from "framer-motion";

interface animacaoheroProps{
    text: string;
    classname?: string;
}

export default function animacaohero({
    text,
    className = "",
}: animacaoheroProps)  {
    return (
        <motion.span
            className={className}
            whileHover="hover"
            initial="initial"
            style={{ display: "inline-block "}}
        >
                {text.split("").map((char, index) => (
                    <motion.span
                        key={'${char}-${index}'}
                        style={{
                            display: "inline-block",
                            whiteSpace: char === " " ? "pre" : "normal",
                        }}
                        variants={{
                            initial: {
                                y: 0,
                                scale: 1,
                            },
                            hover: {
                                y: -4,
                                scale: 1.2,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    delay: index * 0.03,
                                },
                            },
                        }}
                    >
                        {char}
                    </motion.span>        
                ))}
            </motion.span>   
    );
}