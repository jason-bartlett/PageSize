define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",


], function (declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent) {
    "use strict";

    return declare("PageSize.widget.PageSize", [ _WidgetBase ], {


        // Internal variables.
        _handles: null,
        _contextObj: null,
        _grid:null,

        //Modeler
        targetGridName:null,
        sortOptions:null,
        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
           var gridNode=document.querySelector(".mx-name-"+ this.targetGridName);
           if (gridNode)
           {
            console.log("Node found! Here is "+this.targetGridName);
            this._grid= dijit.registry.byNode(gridNode);
            if (!this._grid){
                console.error("Grid not found! Where is "+this.targetGridName);
            }
            this._createAndAppendSelectNode();
           // this._resizeAndReloadGrid(2);


           } else{
            console.error("Grid not found! Where is "+this.targetGridName);
           }
         
           
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback);
        },

        resize: function (box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
        },
        _resizeAndReloadGrid:function(newSize){
            this._grid._dataSource._pageSize=newSize;
            this._grid.params.config.gridpresentation.rows=newSize;
            this._grid.reload();

        },
        _createAndAppendSelectNode:function(){
            var selectNode = document.createElement("select");//select node <select></select>
            this.sortOptions.forEach(function(sortOption){
                var optionNode = document.createElement("option");
                optionNode.setAttribute("value",sortOption.numbRows);
                if (sortOption.isDefault)
                {
                    optionNode.Set
                }
                dojoHtml.set(optionNode,sortOption.caption);
                selectNode.appendChild(optionNode);
            });

            this.connect(selectNode,"onchange",lang.hitch(this,function(e){
                var pageSize = e.target.value;
                //console.log(pageSize);
                this._resizeAndReloadGrid(pageSize);
            }));
            this.domNode.appendChild(selectNode);
        },
        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

          

            this._executeCallback(callback, "_updateRendering");
        },

        // Shorthand for running a microflow
        _execMf: function (mf, guid, cb) {
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["PageSize/widget/PageSize"]);
