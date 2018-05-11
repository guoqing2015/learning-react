class City extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loading: true };
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
  
    componentWillReceiveProps() {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
  
    render() {
      if (this.state.loading) {
        return (
          <img src={`/spinner.gif`} alt="loading" />
        );
      }
     c
    }
  }