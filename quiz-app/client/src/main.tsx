import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App'

// Comprehensive error suppression for React DevTools and Radix UI issues
if (process.env.NODE_ENV === 'development') {
    // Suppress console errors
    const originalError = console.error
    console.error = (...args) => {
        const message = args[0]
        if (typeof message === 'string') {
            const suppressedPatterns = [
                '__reactContextDevtoolDebugId',
                'dismissable-layer',
                'primitive',
                '_context is undefined',
                'onCommitFiberRoot',
                'dispatchDiscreteCustomEvent',
                'handleAndDispatchCustomEvent',
                'handlePointerDown',
                'usePointerDownOutside'
            ]

            if (suppressedPatterns.some(pattern => message.includes(pattern))) {
                return
            }
        }
        originalError(...args)
    }

    // Suppress unhandled promise rejections related to DevTools
    window.addEventListener('unhandledrejection', (event) => {
        const message = event.reason?.message || event.reason
        if (typeof message === 'string' && message.includes('__reactContextDevtoolDebugId')) {
            event.preventDefault()
        }
    })

    // Disable React DevTools if it's causing issues
    if (typeof window !== 'undefined' && (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        ; (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = () => { }
            ; (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberUnmount = () => { }
    }
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)
