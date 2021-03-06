import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchProductFS } from '../actions/productAction'
import FlashSale from '../components/flashSale'
import SkeletonFs from '../components/skeletonFs'
import { bindActionCreators } from 'redux';
import { Container } from '@material-ui/core';


class ProductFSContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.fetchProductFS()

    }

    render() {

        let { productFS } = this.props
        if (productFS.length == 0)
        return <SkeletonFs></SkeletonFs>

        return (
            <div>
                
                <FlashSale products={productFS}> </FlashSale>
            </div>


        );

    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        productFS: state.productFS
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProductFS: bindActionCreators(fetchProductFS, dispatch),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductFSContainer);