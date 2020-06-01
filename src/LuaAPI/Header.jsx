import React, { Component } from "react"
import Octicon, {getIconByName} from '@primer/octicons-react'

class Header extends Component {

	constructor(props){
		super(props)

		// ensure that updateHash() has access to "this"
		this.updateHash = this.updateHash.bind(this)
	}

	updateHash(n){
		const grouping = this.props.grouping || ""
		const dash = this.props.level > 2 ? "-" : ""
		const _name = n || ""

		window.location.hash = "#" + grouping + dash + _name
	}

	generateBase(base){
		if (base === undefined){ return }
		return " : <a href='#" + base.grouping + "-" + base.name + "'>" + base.name + "</a>"
	}

	render(){
		const HeaderTag = `h${this.props.level}`

		return(
			<HeaderTag id={this.props.name} className="API-Category-Header">
				<span className="octicon-link" onClick={() => this.updateHash(this.props.name)}>
					<Octicon size="medium" icon={getIconByName("link")} />
				</span>

				{this.props.name}
				{this.props.smclass.base && <span className="base" dangerouslySetInnerHTML={{ __html: this.generateBase(this.props.smclass.base) }}  />}
			</HeaderTag>
		)
	}
}

export default Header