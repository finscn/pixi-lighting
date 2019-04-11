import LightSpriteRenderer from './LightSpriteRenderer';

export default class LightTarget
{
    static applyTo(sprite)
    {
        /* eslint-disable camelcase */
        const bak = {};

        bak.pluginName = sprite.pluginName;
        bak._renderWebGL = sprite._renderWebGL;
        bak._texturee = sprite._texture;
        // bak.diffuseTexturee = sprite.diffuseTexture;

        sprite.pluginName = LightSpriteRenderer.pluginName;
        sprite._renderWebGL = LightTarget.prototype._renderWebGL;
        // sprite.diffuseTexture = sprite.diffuseTexture || sprite._texture;

        sprite._lightingBackup = bak;
        /* eslint-enable camelcase */
    }

    static unapplyTo(sprite)
    {
        /* eslint-disable camelcase */
        if (sprite._lightingBackup)
        {
            const bak = sprite._lightingBackup;

            sprite.pluginName = bak.pluginName;
            sprite._renderWebGL = bak._renderWebGL;
            sprite._texture = bak._texture;
            // sprite.diffuseTexture = bak.diffuseTexture;

            sprite._lightingBackup = null;
        }
        /* eslint-enable camelcase */
    }

    _renderWebGL(renderer)
    {
        const sprite = this;

        sprite.calculateVertices();

        if (renderer.renderingDiffuses)
        {
            // const originalTexture = sprite._texture;
            const diffuseTexture = sprite.diffuseTexture || sprite._texture;

            sprite._texture = diffuseTexture;

            const plugin = renderer.plugins.sprite;
            // const plugin = renderer.plugins[sprite._lightingBackup.pluginName];

            renderer.setObjectRenderer(plugin);
            plugin.render(sprite);

            return;
        }

        if (renderer.renderingNormals)
        {
            // const originalTexture = sprite._texture;
            const normalTexture = sprite.normalTexture || LightSpriteRenderer.defaultNormalTexture;

            sprite._texture = normalTexture;

            const plugin = renderer.plugins.sprite;
            // const plugin = renderer.plugins[sprite._lightingBackup.pluginName];

            renderer.setObjectRenderer(plugin);
            plugin.render(sprite);

            return;
        }

        const plugin = renderer.plugins.lightSprite;
        // const plugin = renderer.plugins[LightSpriteRenderer.pluginName];

        renderer.setObjectRenderer(plugin);
        plugin.render(sprite);
    }
}
