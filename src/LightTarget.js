import LightSpriteRenderer from './LightSpriteRenderer';

export default class LightTarget
{
    static applyTo(sprite)
    {
        /* eslint-disable camelcase */
        const bak = {};

        bak.pluginNamee = sprite.pluginName;
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

            renderer.setObjectRenderer(renderer.plugins.sprite);
            renderer.plugins.sprite.render(sprite);

            return;
        }

        if (renderer.renderingNormals)
        {
            // const originalTexture = sprite._texture;
            const normalTexture = sprite.normalTexture || LightSpriteRenderer.defaultNormalTexture;

            sprite._texture = normalTexture;

            renderer.setObjectRenderer(renderer.plugins.sprite);
            renderer.plugins.sprite.render(sprite);

            return;
        }

        renderer.setObjectRenderer(renderer.plugins.lightSprite);
        renderer.plugins.lightSprite.render(sprite);
    }
}
