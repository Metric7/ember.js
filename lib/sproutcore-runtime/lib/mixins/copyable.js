// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  Impelements some standard methods for copying an object.  Add this mixin to
  any object you create that can create a copy of itself.  This mixin is
  added automatically to the built-in array.

  You should generally implement the copy() method to return a copy of the
  receiver.

  Note that frozenCopy() will only work if you also implement SC.Freezable.

  @since SproutCore 1.0
*/
SC.Copyable = /** @scope SC.Copyable.prototype */{

  /**
    Walk like a duck. Indicates that the object can be copied.

    @type Boolean
    @default YES
  */
  isCopyable: YES,

  /**
    Override to return a copy of the receiver. Default implementation raises
    an exception.

    @param {Boolean} deep If true, a deep copy of the object should be made
    @returns {Object} copy of receiver
  */
  copy: function(deep) {
    throw new SC.Error("%@.copy() is not implemented");
  },

  /**
    If the object implements SC.Freezable, then this will return a new copy
    if the object is not frozen and the receiver if the object is frozen.

    Raises an exception if you try to call this method on a object that does
    not support freezing.

    You should use this method whenever you want a copy of a freezable object
    since a freezable object can simply return itself without actually
    consuming more memory.

    @returns {Object} copy of receiver or receiver
  */
  frozenCopy: function() {
    var isFrozen = this.get ? this.get('isFrozen') : this.isFrozen;
    if (isFrozen === YES) { return this; }

    if (isFrozen === undefined) {
      throw new SC.Error( SC.String.fmt("%@ does not support freezing", this) );
    } else {
      return this.copy().freeze();
    }
  }
};
