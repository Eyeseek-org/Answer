import { motion } from 'framer-motion'

const ViewFade = ({comp}) => {
    return <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }} viewport={{ once: false }}>{comp}</motion.div>
}

export default ViewFade;