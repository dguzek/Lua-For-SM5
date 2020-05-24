import React, { Component } from "react"
import Octicon, {getIconByName} from '@primer/octicons-react'
import $ from "jquery"

import Method from "./Method"

class ActorClass extends Component {

	constructor(props){
		super(props)
		// ensure that each of these functions has access to "this"
		this.updateHash = this.updateHash.bind(this)
		this.getAll     = this.getAll.bind(this)
		this.filter     = this.filter.bind(this)
		this.handleTFChange = this.handleTFChange.bind(this)

		this.allMethods = this.getAll()
		this.methods    = this.allMethods

		this.textfilter = this.props.text_filter
	}

	generateBase(base){
		if (base === undefined){ return }
		return " : <a href='#" + base.grouping + "-" + base.name + "'>" + base.name + "</a>"
	}

	updateHash(){
		window.location.hash = "#" + this.props.grouping + "-" + this.props.smclass.name
	}

	getAll(){
		const actor_name = this.props.smclass.name
		const grouping = this.props.grouping
		return this.props.smclass.methods.map(function(method, j){
			return <Method sm_class_grouping={grouping} sm_class={actor_name} method={method} key={actor_name + "-" + method.name + j} />
		})
	}

	handleTFChange(){
		const showAllMethods = (this.props.smclass.name.toUpperCase().includes(this.props.text_filter) || (this.props.smclass.base !== undefined && this.props.smclass.base.name.toUpperCase().includes(this.props.text_filter)))
		this.methods = showAllMethods ? this.allMethods : this.filter()
		this.textfilter = this.props.text_filter
	}

	filter(){
		const actor_name  = this.props.smclass.name
		const text_filter = this.props.text_filter
		const grouping    = this.props.grouping

		// loop through the methods available to this actor, using
		// filter() to reduce a larger array to a smaller array of filtered results
		const filtered_methods = this.props.smclass.methods.filter(function(method){
			// check for case-insensitive strings matches on the method name or description
			// if either is a match, return true, which means this method passes the filter()
			// test and will be included in the pared down filtered_methods array
			return (method.name.toUpperCase().includes(text_filter) || (  ($("<div>").html(method.desc).text() ).toUpperCase().includes(text_filter)))
		})

		return filtered_methods.map(function(method, j){
			return <Method sm_class_grouping={grouping} sm_class={actor_name} method={method} key={actor_name + "-" + method.name + j} />
		})
	}

	render(){
		if (this.props.text_filter !== this.textfilter){ this.handleTFChange() }
		if (this.props.text_filter !== "" && this.methods.length < 1){ return null }

		return(
			<div id={this.props.grouping + "-" + this.props.smclass.name} className="actor-class">
				<h3>
					<span className="octicon-link" onClick={this.updateHash}><Octicon size="medium" icon={getIconByName("link")} /></span>
					{this.props.smclass.name}
					<span className="base" dangerouslySetInnerHTML={{ __html: this.generateBase(this.props.smclass.base) }}  />
				</h3>
				<hr />

				<span className="actorclass-description" dangerouslySetInnerHTML={{__html: this.props.smclass.desc}} />

				{this.methods}
			</div>
		)
	}
}

export default ActorClass