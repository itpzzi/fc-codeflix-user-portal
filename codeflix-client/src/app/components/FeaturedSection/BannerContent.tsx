import { Movie } from "@/types/movie";
import { Info, Play } from 'lucide-react';
import { motion } from "framer-motion";


const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.3,
        },
    }),
};

interface Props extends Movie {}

export function BannerContent(props: Props) {
    return (
        <motion.div
            key={props.title}
            className="relative z-10 text-white"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <motion.p
                className="text-2xl md:text-4xl lg:text-7xl font-bold"
                variants={slideInLeft}
            >
                {props.title}
            </motion.p>

            <motion.p
                key={props.title}
                className="mt-3 text-xl max-w-3xl text-white/70"
                variants={{
                    ...slideInLeft,
                    show: { ...slideInLeft.show, transition: { duration: 0.5, delay: 0.2 } },
                }}
            >
                {props.description}
            </motion.p>

            <div className="my-8 flex space-x-2">
                {props.genres.map((genre, index) => (
                    <motion.button
                        key={index}
                        custom={index}
                        variants={scaleIn}
                        initial="hidden"
                        animate="show"
                        className="p-2 px-4 text-gray-300 border bg-black/50 rounded-full"
                    >
                        {genre}
                    </motion.button>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-4">
                <motion.a
                    key={props.link}
                    href={props.link}
                    className="bg-white text-black text-2xl px-6 py-4 font-semibold hover:scale-105 transition-transform rounded-full"
                    custom={0}
                    variants={scaleIn}
                    initial="hidden"
                    animate="show"
                >
                    <button className="inline-flex space-x-4"><Play /> <span>Watch Now</span></button>
                </motion.a>

                <motion.button
                    key={props.title}
                    className="flex items-center gap-2 text-white px-4 py-2 rounded-full"
                    custom={1}
                    variants={scaleIn}
                    initial="hidden"
                    animate="show"
                >
                    <Info />
                    Watch Info
                </motion.button>
            </div>
        </motion.div>
    );
}
