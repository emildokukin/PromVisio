import clsx from 'clsx'
import styles from './NewsPagination.module.scss'
import useMedia from '../../utils/useMedia'
import SliderButton from '../../common/slider/SliderButton'

// TODO: use to determine dots count
// interface newsPagination {
//     newsTotal: number
//     maxPoints: number
// }

const totalCircles = 6

const NewsPagination = () => {
  const {isDesktop} = useMedia()

  return (
    <div className={styles.dots}>
      {isDesktop && <SliderButton className={styles.arrowPrev} disabled />}

      <ul className={styles.dotsMiddle}>
        <li className={clsx(styles.dot, styles.dotActive)}>1</li>
        {Array(totalCircles - 3)
          .fill(0)
          .map((_, index) => (
            <li key={index + 1} className={styles.dot}>
              {index + 2}
            </li>
          ))}
        <li className={styles.dot}>...</li>
        <li className={styles.dot}>999</li>
      </ul>

      {isDesktop && <SliderButton className={styles.arrowNext} next />}
    </div>
  )
}

export default NewsPagination
