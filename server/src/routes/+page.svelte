<script>
    let {data} = $props()
    $inspect(data)
</script>

<h1>Todos (server.ts)</h1>
{#if data?.content?.ok }
    <h2>{data.content.content[0].text}</h2>
{/if}
<form method=POST>
    <input type="text" name="todo" />
</form>