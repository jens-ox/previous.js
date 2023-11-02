import { createRoot } from 'react-dom/client'
import { createApp } from './main'

const root = createRoot(document.querySelector('main')!)
root.render(createApp())
