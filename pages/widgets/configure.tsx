import type { NextPage } from 'next'

import { useCeramicContext } from '../../context'
import styles from '../styles/Home.module.css'

/**
 * 
 * @returns Load widget configurator for new widget instance or existing widget instance
 */
const ConfigureWidget: NextPage = () => {
  const clients = useCeramicContext()
  const { ceramic, composeClient } = clients

  return (
    <div className={styles.container}>
    </div>
  );
}

export default ConfigureWidget
