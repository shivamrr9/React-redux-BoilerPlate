import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';

const LoaderL = () => <CircularProgress size={100} thickness={7} />

const LoaderM = () => <CircularProgress size={50} thickness={5} />

const LoaderS = () => <CircularProgress size={30} thickness={3} />

export { LoaderS, LoaderM, LoaderL }