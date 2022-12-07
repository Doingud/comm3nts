import type { NextPage } from 'next'

import { useCeramicContext } from '../../context'
import styles from '../styles/Home.module.css'

/**
 * List account widgets configured.
 * @returns 
 */
const WidgetsList: NextPage = () => {
  const clients = useCeramicContext()
  const { ceramic, composeClient } = clients

  return (
    <div className={styles.container}>
    </div>
  );
}

export default WidgetsList;
