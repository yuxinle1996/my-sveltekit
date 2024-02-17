<h1>Welcome to SvelteKit</h1>
<div>
	<p>你好</p>
</div>
<input type="text" />
<select>
	<option value="">Option</option>
</select>
<button>点击</button>
<div style="height: 1000px;"></div>
<div id="haha" style="height: 1000px;">哈哈哈</div>

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
