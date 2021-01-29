/**
 * @jsx React.DOM
 */

function requireLibs(libs, callback) {
  var expanded = libs.map(function(arg) {
    return '../../bin/web/intent/' + arg;
  });
  expanded.push('jquery');
  require(expanded, callback);
}

function cssClasses(map) {
  var s = '';
  for (var className in map) {
    if (map.hasOwnProperty(className) && map[className])
      s += className + ' ';
  }
  return s;
}

var SharedLayoutMixin = {
  handleMouseEnter: function(event) {
    var hoveredBoxes = this.props.sharedVisual.hoveredBoxes;
    hoveredBoxes.push(this.props.box);
    this.setState({ hoveredBoxes: hoveredBoxes });
  },
  handleMouseLeave: function(event) {
    var hoveredBoxes = this.props.sharedVisual.hoveredBoxes;
    hoveredBoxes.pop();
    this.setState({ hoveredBoxes: hoveredBoxes });
  },
  isMouseOver: function() {
    var hoveredBoxes = this.state.hoveredBoxes;
    return (
      hoveredBoxes && hoveredBoxes.length > 0 &&
        hoveredBoxes[hoveredBoxes.length - 1] === this.props.box
    );
  },
  handleClick: function(event) {
    if (event.target !== this.getDOMNode()) {
      return;
    }

    var selectedBoxes = this.props.sharedVisual.selectedBoxes;
    var index = selectedBoxes.indexOf(this.props.box);

    if (index === -1) {
      // Not selected yet
      this.setState({
        selected: true
      });
      selectedBoxes.push(this.props.box);
    } else {
      // Already selected
      this.setState({
        selected: false
      });
      selectedBoxes.splice(index, 1);
    }
  },
};

var PreviewBox = React.createClass({
  mixins: [SharedLayoutMixin],
  getInitialState: function() {
    return {};
  },
  render: function() {
    var layout = this.props.layout;
    var box = this.props.box;
    var children = (box.children || []).map(function(child) {
      return (
        <PreviewBox
          box={child}
          layout={layout}
          key={child.id}
          sharedVisual={this.props.sharedVisual}
          />
      );
    }.bind(this));
    children.reverse();

    var rect = layout.getRect(box);
    return (
      <div class={cssClasses({
        'layout-box': true,
        'layout-box--hovered': this.isMouseOver(),
        'layout-box--selected': this.state.selected,
      })}
      style={{
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.w + 'px',
        height: rect.h + 'px',
      }}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      onClick={this.handleClick}>
      {children}
      </div>
    );
  }
});

var PreviewRoot = React.createClass({
  render: function() {
    var layout = this.props.layout;
    return (
      <div class="layout-root">
        <PreviewBox
          box={layout.root}
          layout={layout}
          sharedVisual={this.props.sharedVisual}
          />
        </div>
    );
  }
});

var TreeBox = React.createClass({
  mixins: [SharedLayoutMixin],
  getInitialState: function() {
    return {};
  },
  render: function() {
    var layout = this.props.layout;
    var box = this.props.box;
    var children = (box.children || []).map(function(child) {
      return (
        <TreeBox
          box={child}
          layout={layout}
          key={child.id}
          sharedVisual={this.props.sharedVisual}
          />
      );
    }.bind(this));

    return (
      <div class="tree-box">
        <div class="tree-children">{children}
        </div>
        );
        }
        });

        var TreeRoot = React.createClass({
          render: function() {
            return (
              <div class="tree-root">
                <TreeBox
                  layout={this.props.layout}
                  box={this.props.layout.root}
                  sharedVisual={this.props.sharedVisual}
                  />
                </div>
                );
          }
        });

        var App = React.createClass({
          render: function() {
            return (
              <div class="app">
                <TreeRoot
                  layout={this.props.layout}
                  sharedVisual={this.props.sharedVisual}
                  />
                  <PreviewRoot
                    layout={this.props.layout}
                    sharedVisual={this.props.sharedVisual}
                    />
                  </div>
                  );
          }
        });

        requireLibs(['util', 'layout', 'generator', 'tree'], function(util, l, gen, tree, $) {
          $.getJSON('/tmp/derp/root.json', function(root) {
            tree.refreshParents(root);
            var layout = new l.Layout(root);
            var sharedVisual = {
              hoveredBoxes: [],
              selectedBoxes: [],
            };
            var app = <App layout={layout} sharedVisual={sharedVisual} />;
            React.renderComponent(app, document.getElementById('root'));
          });
        });

