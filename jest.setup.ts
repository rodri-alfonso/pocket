import '@testing-library/jest-dom/extend-expect'
const LocalStorage = require('./local-storage-mock')

global.localStorage = new LocalStorage()
