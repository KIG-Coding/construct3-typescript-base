// NOTE: this file is auto-generated by Construct
declare namespace InstanceType {
	class __playerBehaviors<InstType> {
		Platform: IPlatformBehaviorInstance<InstType>;
	}
	class player extends ISpriteInstance {
		behaviors: __playerBehaviors<this>;
	}
	class __groundBehaviors<InstType> {
		Solid: ISolidBehaviorInstance<InstType>;
	}
	class ground extends ISpriteInstance {
		behaviors: __groundBehaviors<this>;
	}
	class Keyboard extends IInstance {
	}
	class hostIndicator extends ISpriteInstance {
	}
	class Multiplayer extends IInstance {
	}
	class txtDebug extends ITextInstance {
	}
	class __lblNameBehaviors<InstType> {
		Pin: IBehaviorInstance<InstType>;
	}
	class lblName extends ITextInstance {
		behaviors: __lblNameBehaviors<this>;
	}

}