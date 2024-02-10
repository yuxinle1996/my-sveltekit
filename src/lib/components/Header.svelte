<script>
	import { Navigation } from '$components';
</script>

<div class="content">
	<div class="left">
		<Navigation desktop={false} />
	</div>
	<div class="right">right</div>
</div>

<style lang="scss">
	.content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
