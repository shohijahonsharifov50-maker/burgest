import { Component } from 'react';

/** Renders `fallback` (nothing by default) if a decorative child fails, e.g. WebGL is unavailable. */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('Decorative component disabled:', error.message);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
