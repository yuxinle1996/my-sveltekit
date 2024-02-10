<!-- 首页 / -->
<h1>Welcome to SvelteKit</h1>
<div>
	<p>你好</p>
</div>
<input type="text" />
<select>
	<option value="">Option</option>
</select>
<button>Click me</button>

<style lang="scss">
	h1 {
		color: red;
		font-size: functions.toRem(36);

		@include breakpoint.up('md') {
			color: blue;
		}
		@include breakpoint.up('lg') {
			color: green;
		}
	}
</style>
