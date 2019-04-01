/**
 * Contains mixins for the `PIXI.Circle` class.
 * @class Circle
 * @memberof PIXI
 * @see http://pixijs.download/release/docs/PIXI.Circle.html
 */
/**
 * Creates vertices and indices arrays to describe this circle.
 * @method PIXI.Circle#getMesh
 * @param {number} [totalSegments=40] Total segments to build for the circle mesh.
 * @param {Float32Array} [verticesOutput] An array to output the vertices into. Length must be
 *  `((totalSegments + 2) * 2)` or more. If not passed it is created for you.
 * @param {Uint16Array} [indicesOutput] An array to output the indices into, in gl.TRIANGLE_FAN format. Length must
 *  be `(totalSegments + 3)` or more. If not passed it is created for you.
 * @return {PIXI.Circle~MeshData} Object with verticies and indices arrays
 */
PIXI.Circle.prototype.getMesh = function getMesh(totalSegments = 40, verticesOutput, indicesOutput)
{
    verticesOutput = verticesOutput || new Float32Array((totalSegments + 1) * 2);
    indicesOutput = indicesOutput || new Uint16Array(totalSegments + 1);

    const seg = (Math.PI * 2) / totalSegments;
    let indicesIndex = -1;

    indicesOutput[++indicesIndex] = indicesIndex;

    for (let i = 0; i <= totalSegments; ++i)
    {
        const index = i * 2;
        const angle = seg * i;

        verticesOutput[index] = Math.cos(angle) * this.radius;
        verticesOutput[index + 1] = Math.sin(angle) * this.radius;

        indicesOutput[++indicesIndex] = indicesIndex;
    }

    indicesOutput[indicesIndex] = 1;

    return { verticesOutput, indicesOutput };
};

/**
 * @typedef PIXI.Circle~MeshData
 * @property {Float32Array} vertices - Vertices data
 * @property {Uint16Array} indices - Indices data
 */
