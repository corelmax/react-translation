import React from 'react'
import PropTypes from 'prop-types'

export class TranslationProvider extends React.Component {
  static propTypes = {
    translation: PropTypes.object.isRequired,
    default: PropTypes.string,
    children: PropTypes.any
  }

  static childContextTypes = {
    translation: PropTypes.object,
    t: PropTypes.func,
    translate: PropTypes.func
  }

  static defaultProps = {
    default: 'en_US'
  }

  state = {
    translation: {
      'en_US': {}
    },
    lang: 'en_US'
  }

  constructor(props) {
    super(props)

    this.state = {
      ...props,
      lang: props.default
    }
  }

  getChildContext() {
    return {
      translation: {
        lang: this.props.default,
        setLang: this
          .setLang
          .bind(this)
      },
      t: this
        .translate
        .bind(this),
      translate: this
        .translate
        .bind(this)
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }

  setLang(lang) {
    this.setState({lang})
  }

  translate(key) {
    const fallbackLang = 'en_US'
    if (typeof(this.state.translation[this.state.lang]) === typeof({}) && typeof(this.state.translation[this.state.lang][key]) !== 'undefined') {
      return this.state.translation[this.state.lang][key]
    } else if (typeof(this.state.translation[fallbackLang]) === typeof({}) && typeof(this.state.translation[fallbackLang][key]) !== 'undefined') {
      return this.state.translation[fallbackLang][key]
    }
    return key
  }
}

export default Component => {
  class Translate extends React.Component {
    render() {
      return <Component { ...this.props } { ...this.context }/>
    }
  }

  Translate.contextTypes = TranslationProvider.childContextTypes;

  return Translate;
}