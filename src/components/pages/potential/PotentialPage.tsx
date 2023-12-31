import styles from './PotentialPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import {ReactComponent as HumanSVG} from '../../../icons/human.svg'
import {ReactComponent as LightningSVG} from '../../../icons/lightning.svg'
import {ReactComponent as AimSVG} from '../../../icons/aim.svg'
import {ReactComponent as PromoSVG} from '../../../icons/promo.svg'
import {ReactComponent as ShortMovieSVG} from '../../../icons/short-movie.svg'
import {ReactComponent as InternetVersionSVG} from '../../../icons/internet-version.svg'
import {ReactComponent as SwitchSVG} from '../../../icons/switch.svg'
import {ReactComponent as LikeSVG} from '../../../icons/like.svg'
import {ReactComponent as FunnelSVG} from '../../../icons/funnel.svg'
import {ReactComponent as FlagSVG} from '../../../icons/flag.svg'
import {ReactComponent as StarSVG} from '../../../icons/star.svg'

import MenIMG from '/media/potential/men.jpg'
import {Slider} from '../home/HomePage'
import {Gallery} from '../gallery/GalleryPage'
import useMedia from '../../utils/useMedia'
import {useCallback, useContext, useState} from 'react'
import FormModal from '../../common/modal/FormModal'
import PreviewContext from '../../utils/preview'
import {useQueryFindData} from '../../utils/useQueryData'
import {PotentialData} from './types'
import Loading from '../../common/loading/Loading'

const PotentialPage = () => {
  const {isMobile, isDesktop} = useMedia()
  const {preview} = useContext(PreviewContext)
  const {data, isLoading} = useQueryFindData<PotentialData>(['potential'])

  const parsedData = preview ? preview : data

  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModalVisibility = useCallback(() => setIsModalVisible((prev) => !prev), [])

  return (
    <Page className={styles.page} scrollButton={isDesktop}>
      <Helmet>
        <title>{parsedData?.title || 'История одного проекта'}</title>
      </Helmet>

      <div className={styles.wrapper}>
        <h1>
          ПРО <HumanSVG /> Потенциал
        </h1>
      </div>

      <section className={styles.frame}>
        <div className={styles.men}>
          <img src={MenIMG} alt='men' />
        </div>
        <div className={styles.text}>
          <h2>
            Видеопроект, направленный на популяризацию и повышение интереса к различным профессиям, в первую очередь
            промышленным.
          </h2>
          <p>
            В удобном и доступном виде мы сможем рассказать о трудовых буднях специалистов, пути, который они прошли, и
            возможностях, открывающихся перед ними.
          </p>
        </div>
      </section>

      {isLoading ? <Loading /> : <Slider className={styles.slider} items={parsedData?.slider} />}

      <section className={styles.format}>
        <h1>
          Проект предполагает различный {isDesktop && <br />} <LightningSVG /> формат для {isDesktop && <AimSVG />}{' '}
          охвата {isMobile && <AimSVG />} максимальной аудитории
        </h1>
        <ul className={styles.list}>
          <li>
            <PromoSVG />
            <span>Короткий проморолик</span>
          </li>
          <li>
            <ShortMovieSVG />
            <span>Короткометражный фильм для целевой аудитории</span>
          </li>
          <li>
            <InternetVersionSVG />
            <span>Интернет-версия ролика с возможностью контекстного продвижения</span>
          </li>
        </ul>
      </section>

      <section className={styles.wrapper}>
        <div className={styles.givesWrapper}>
          <div className={styles.gives}>
            <h1>
              Что даёт {isDesktop && <SwitchSVG />} участие {isMobile && <SwitchSVG />} {isDesktop && <br />} в проекте
            </h1>

            <ul className={styles.list}>
              <li>
                <LikeSVG />
                <span>Повышение престижа профессии</span>
              </li>

              <li>
                <FunnelSVG />
                <span>Приток соискателей на рабочие места</span>
              </li>

              <li>
                <FlagSVG />
                <span>Демонстрация потенциального карьерного пути</span>
              </li>

              <li>
                <StarSVG />
                <span>Продакт-плейсмент вашей компании</span>
              </li>
            </ul>

            <button className={styles.button} onClick={toggleModalVisibility}>
              Участвовать <br /> в проекте
            </button>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <Gallery
            className={styles.gallery}
            images={parsedData?.gallery?.images}
            videos={parsedData?.gallery?.videos}
            pageID={parsedData?.id}
          />
        )}
      </section>

      <FormModal
        active={isModalVisible}
        toggle={toggleModalVisibility}
        title='Участие в проекте'
        image='/media/potential/potential.png'
        className={styles.modal}
      />
    </Page>
  )
}

export default PotentialPage
