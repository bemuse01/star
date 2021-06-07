export default {
    createAttribute({count, distance, gap, depth}){
        const len = count * count
        const position = new Float32Array(len * 3)
        const degree = [], radius = [], velocity = []

        for(let i = 0; i < len; i++){
            const index = i * 3

            const deg = Math.random() * 360
            const rad = Math.random() * gap + distance

            const x = Math.cos(deg * RADIAN) * rad
            const y = Math.sin(deg * RADIAN) * rad
            const z = Math.random() * depth

            position[index] = x
            position[index + 1] = y
            position[index + 2] = z

            degree[i] = deg
            radius[i] = rad
            velocity[i] = Math.random() * 0.3
        }

        return {position, velocity, degree, radius}
    }
}