import { useEffect, useRef, memo } from 'react';
import lottie from 'lottie-web'
import animationData from '../../assets/animation/not-found.json'
const Animation = ({ className }: {
    className: string;
}) => {
    const containerRef = useRef<any>();
    useEffect(() => {
        lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData
        })
        return () => lottie.destroy()
    },[className])
    return (
        <div ref={containerRef} className={className}>
            
        </div>
    )
}

export default memo(Animation)