
/**
 * ECC-CGP-Engine.js
 * 
 * Computer-based Graphics and Physics Engine
 * This is the wrapped version of the EngineCore
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory | ECC-Lab@KMUTT
 * 
 * 28 February 2019
 */

import { EngineCore, CANNON, THREE, Utils }         from './EngineCore';
import { Graphics, Physics, RayCast, Keyboard }     from './EngineCore';
import { ActorLoader, Options }                     from './EngineCore';



export default class Engine {

    /**
     * Constructor of the EngineCore
     * @param {object} options EngineCore options
     */
    constructor( options ) {

        this.core = new EngineCore( options );
    }


    /**
     * THREE.Color
     */
    static get Color() {
        return THREE.Color;  
    }

    /**
     * THREE.Vector3
     */
    static get Vector3(){
        return THREE.Vector3;
    }

    /**
     * CANNON.Vec3
     */
    static get Vec3(){
        return CANNON.Vec3;
    }

    /**
     * THREE.Vector2
     */
    static get Vector2(){
        return THREE.Vector2;
    }

    /**
     * CANNON.Vec2
     */
    static get Vec2(){
        return CANNON.Vec2;
    }

    /**
     * Return Forward vector (0, 0, +1)
     */
    static get ForwardVector(){
        return new CANNON.Vec3(0, 0, +1);
    }

    /**
     * Return Backward vector (0, 0, -1)
     */
    static get BackwardVector(){
        return new CANNON.Vec3(0, 0, -1);
    }

    /**
     * Return Right vector (-1, 0, 0)
     */
    static get RightVector(){
        return new CANNON.Vec3(-1, 0, 0);
    }

    /**
     * Return Left vector (+1, 0, 0)
     */
    static get LeftVector(){
        return new CANNON.Vec3(+1, 0, 0);
    }

    /**
     * Return Up vector (0, +1, 0)
     */
    static get UpVector(){
        return new CANNON.Vec3(0, +1, 0);
    }

    /**
     * Return Down vector (0, -1, 0)
     */
    static get DownVector(){
        return new CANNON.Vec3(0, -1, 0);
    }

    /**
     * Returns scaled forward vector
     * @param {number} scale vector scale
     */
    getForwardVector( scale ) {
        return new CANNON.Vec3(0, 0, +1).mult( (scale?scale:1) );   
    }

     /**
     * Returns scaled backward vector
     * @param {number} scale vector scale
     */
    getBackwardVector( scale ) {
        return new CANNON.Vec3(0, 0, -1).mult(scale?scale:1);   
    }

     /**
     * Returns scaled right vector
     * @param {number} scale vector scale
     */
    getRightVector( scale ){
        return new CANNON.Vec3(-1, 0, 0).mult(scale?scale:1); 
    }

    /**
     * Returns scaled left vector
     * @param {number} scale vector scale
     */
    getLeftVector( scale ){
        return new CANNON.Vec3(+1, 0, 0).mult(scale?scale:1); 
    }

    /**
     * Returns scaled up vector
     * @param {number} scale vector scale
     */
    getUpVector( scale ){
        return new CANNON.Vec3(0, +1, 0).mult(scale?scale:1); 
    }

    /**
     * Returns scaled down vector
     * @param {number} scale vector scale
     */
    getDownVector( scale ){
        return new CANNON.Vec3(0, -1, 0).mult(scale?scale:1); 
    }


    /**
     * Initialise the core engine. After the engine is iniialized, it will return the Promise and execute the provided callback
     * @param {object}    options   initialization options
     * @param {function}  callback  callback function will be called after all files are loaded
     * @return Promise
     */
    init( options, callback ){
        return this.core.init( options, callback );
    }


    /**
     * Start the engine
     * @param {function} callback It the callback is given, the callback will be periodically called every frame.
     */
    start( callback )  {
        return this.core.start( callback );   
    }


    /**
     * Stop the engine
     */
    stop()  {
        return this.core.stop();   
    }


    /**********************************************************************************************************/
    /*           Options           Options            Options            Options            Options           */
    /**********************************************************************************************************/

    /**
     * Returns default options
     * @return Options
     */
    getDefaultOptions() {
        return this.core.defaultOptions;
    }

    /**
     * Returns engine options
     */
    getEngineOptions() {
        return this.core.options;
    }

    /**
     * Returns graphics options
     */
    getGraphicsOptions() {
        return this.core.graphics.options;   
    }

    /**
     * Returns physics options
     */
    getPhysicsOptions() {
        return this.core.physics.options;   
    }

    /**
     * Returns engine default options
     */
    getEngineDefaultOptions() {
        return this.core.defaultOptions.engine;
    }

    /**
     * Returns graphics default options
     */
    getGraphicsDefaultOptions() {
        return this.core.defaultOptions.graphics;
    }

    /**
     * Returns Physics default options
     */
    getPhysicsDefaultOptions() {
        return this.core.defaultOptions.physics;
    }


    /**********************************************************************************************************/
    /*       Mesh Utility      Mesh Utility       Mesh Utility       Mesh Utility       Mesh Utility          */
    /**********************************************************************************************************/

    /**
     * Returns a mesh specified by the mesh name
     * @param {string} name mesh name
     * @return THREE.Mesh
     */
    getMeshByName( name ) {
        return this.core.graphics.meshUtils.getMeshByName( name );
    }

     /**
     * Returns all meshes in the current scene
     * @return array of THREE.Mesh
     */
    getAllMeshes() {
        return this.core.graphics.meshUtils.getAllMeshes( name );
    }

    /**
     * Return all meshes (array of meshes) in the provided scene. If the scene is not provided, the current scene will be used as target scene
     * @param {THREE.Scene} scene target scene
     * @return array of THREE.Mesh
     */
    getMeshesFromScene( scene ) {
        return this.core.graphics.meshUtils.getMeshesFromScene( scene ); 
    }


    /**
     * Adds axes to the spefied mesh
     * @param {THREE.Mesh} mesh THREE Mesh
     * @param {number} size Axes size
     */
    addAxesToMesh( mesh, size ) {
        return this.core.graphics.meshUtils.addAxesToMesh( mesh, size );
    }


    /**
     * Removes axes to the spefied mesh
     * @param {THREE.Mesh} mesh THREE Mesh
     */
    removeAxesFromMesh( mesh ) {
        return this.core.graphics.meshUtils.removeAxesFromMesh( mesh );
    }


    /**
     * Adds axes to all meshes in the currentt scene
     * @param {number} size Axes size
     */
    addAxesToAllMeshes( size ) {
        return this.core.graphics.meshUtils.addAxesToAllMeshes( size );
    }

    /**
     * Removes axes from all meshes in the currentt scene
     */
    removeAxesFromAllMeshes( ) {
        return this.core.graphics.meshUtils.removeAxesFromAllMeshes();
    }

    /**
     * Apply reflection map to all meshes
     */
    applyReflectionMapToAllMeshes() {
        return this.core.graphics.meshUtils.applyReflectionMapToAllMeshes();
    }



    /**********************************************************************************************************/
    /*        Body Utility      Body Utility       Body Utility       Body Utility       Body Utility         */
    /**********************************************************************************************************/

    /**
     * Returns a rigid body specified by mesh name
     * @param {string} name mesh name
     * @return CANNON.Body
     */
    getBodyByMeshName( name ) {
        return this.core.physics.bodyUtils.getBodyByMeshName( name );
    }


    /**
     * Returns all rigid bodies (array of bodies) in the current world
     * @return array of CANNON.Body
     */
    getBodiesFromWorld() {
        return this.core.physics.world.bodies;
    }


    /**
     * Returns all meshes (array of mesh) in the current world
     * @return array of THREE.Mesh
     */
    getMeshesFromWorld() {
        return this.core.physics.bodyUtils.getMeshesFromWorld();
    }


    /**
     * Set/Change the provided body to static body
     * @param {CANNON.Body} body 
     */
    setBodyToStatic( body ) {
        return this.core.physics.bodyUtils.changeBodyToStatic( body );
    }


    /**
     * Set/Change the provided body to dynamic body
     * @param {CANNON.Body} body 
     */
    setBodyToDynamic( body, mass ) {
        return this.core.physics.bodyUtils.changeBodyToStatic( body, mass );
    }

    /**
     * Set mass of the rigid-body. If the mass is zero, the rigid-body will be changed to static rigid-body
     * @param {THREE.Body} body target rigid-bosy
     * @param {number} mass     mass mass of the rigid-body
     * @return CANNON.Body
     */
    setBodyMass( body, mass ) {
        return this.core.physics.bodyUtils.changeMassOfBody( body, mass );
    }

    /**
     * Returns mass of the mesh. The mass is calculated from the dimension of the mesh
     * @param {THREE.Mesh} mesh target mesh
     * @return CANNON.Body
     */
    getMassFromMesh( mesh ) {
        const name = mesh.name.toLowerCase();
        if( name.includes( 'static' ) || name.includes( 'ground' ) )
            return 0;
        return ( mesh.scale.x + mesh.scale.y + mesh.scale.z )/3;   
    }


    /**********************************************************************************************************/
    /*  Physics Materials   Physics Materials    Physics Materials    Physics Materials    Physics Materials  */
    /**********************************************************************************************************/

    /**
     * Creates and returns ground material. The created material is added to the physics world internally
     * @param {number} friction     Ground friction
     * @param {number} restitution  Ground restitution
     * @return CANNON.Material
     */
    createGroundMaterial( friction, restitution ) {
        return this.core.physics.createGroundMaterial( friction, restitution );
    }


    /**
     * Creates and returns object (body) material. The created material is added to the physics world internally
     * @param {number} friction     Object friction
     * @param {number} restitution  Object restitution
     * @return CANNON.Material
     */
    createObjectMaterial( friction, restitution, groundMaterial ) {
        return this.core.physics.createObjectMaterial( friction, restitution, groundMaterial );
    }


    /**********************************************************************************************************/
    /*   Keyboard      Keyboard       Keyboard       Keyboard       Keyboard       Keyboard        Keyboard   */
    /**********************************************************************************************************/

    /**
     * Check key pressed, return true if the desired key is pressed
     * @param {string} key      a character or key name
     * @param {number} interval time between each key pressed
     * @return boolean
     */
    getKeyDown( key, interval ) {
        return this.core.keyboard.getKeyDown( key, interval );
    }




    /**********************************************************************************************************/
    /*       Raycaster      Raycaster       Raycaster       Raycaster       Raycaster       Raycaster         */
    /**********************************************************************************************************/

    /**
     * Returns raycasting parameters of all objects
     */
    doRaycast() {
        return this.core.raycaster.doRaycast();
    }

    /**
     * Returns raycasting parameters of the first object
     */
    getRaycast() {
        const raycast = this.core.raycaster.doRaycast();
        if(raycast.length < 1) return undefined;
        return raycast[0];
    }


    //!!---------------- Ray -------------------------------------------

    /**
     * Return Ray of the raycasting operation
     * @return object { mesh, intersecs, ray }
     */
    getRay() {
        return this.getRaycast().ray;
    }

    /**
     * Return RayDirection of the raycasting operation
     * @return ray.direction
     */
    getRayDirection() { 
        const ray = this.getRay();
        if(!ray) return undefined;
        return new CANNON.Vec3(ray.direction.x, ray.direction.y, ray.direction.z); 
    }

    /**
     * Return RayOrigin of the raycasting operation
     * @return ray.origin
     */
    getRayOrigin() {
        const ray = this.getRay();
        if(!ray) return undefined;
        return new CANNON.Vec3(ray.origin.x, ray.origin.y, ray.origin.z);
    }


    //!!-----------------------------------------------------------------
    //!!---------------- Intersect --------------------------------------
    //!!-----------------------------------------------------------------

    /**
     * Return RayIntersec of the raycasting operation
     * @return intersect
     */
    getRayIntersec() {
        const raycast = this.getRaycast();
        return raycast.intersect;
    }

    /**
     * Return RayDistance of the raycasting operation
     * @return intersect.distance
     */
    getRayDistance() {
        const raycast = this.getRaycast();
        const intersect = raycast.intersect;
        if(!intersect) return undefined;
        return intersect.distance;
    }

    /**
     * Return RayPoint of the raycasting operation
     * @return intersect.point
     */
    getRayPoint() {
        const raycast = this.getRaycast();
        const intersect = raycast.intersect;
        if(!intersect) return undefined;
        return new CANNON.Vec3(intersect.point.x, intersect.point.y, intersect.point.z);
    }
    //!!---------------- END Intersect -----------------------------------



    /**
     * Return RayObject of the raycasting operation
     * @return intersect.object
     */
    getRayMesh() {
        const raycast = this.getRaycast();
        const mesh = raycast.mesh;
        if( mesh && mesh.parent && mesh.parent instanceof THREE.Group ) {
            return mesh.parent;
        }
        return mesh;
    }

    /**
     * Returns a rigid body of the raycasting operation
     * @return CANNON.Body
     */
    getRayBody() {
        const raycast = this.getRaycast();
        if( raycast.mesh ) {
            return this.getBodyByMeshName( raycast.mesh.name );
        }
        return undefined;
    }

    /**
     * Helper function to apply force and impulse to world point ro local point
     * @param {number} scale force or impulse scale
     * @param {number} type  0: force, 1: local force, 2: impulse, 3: local impulse
     * @return CANNON.Body
     */
    applyForceImpulseWorldLocal( scale, type ) {
        const raycast = this.getRaycast();
        if(!raycast) return undefined;
        const direction = new CANNON.Vec3(raycast.ray.direction.x,   raycast.ray.direction.y,   raycast.ray.direction.z);
        const point     = new CANNON.Vec3(raycast.intersect.point.x, raycast.intersect.point.y, raycast.intersect.point.z);
        const body = this.getBodyByMeshName( raycast.mesh.name );
        if( !body ) return
        if( type === 0 ) {
            body.applyForce( direction.mult(scale), point );    
        }else if( type === 1 ){
            body.applyLocalForce( direction.mult(scale), point );    
        }else if( type === 2 ){
            body.applyImpulse( direction.mult(scale), point );    
        }else if( type === 3 ){
            body.applyLocalImpulse( direction.mult(scale), point );    
        }
        return body;
    }

    /**
     * Apply force to raycased rigid body
     * @param {number} forceScale force scale to be applied to the raycasted body
     * @return CANNON.Body
     */
    applyForceToRayBody( forceScale ) {
        return this.applyForceImpulseWorldLocal(forceScale, 0);
    }

    /**
     * Apply local force to raycased rigid body
     * @param {number} forceScale force scale to be applied to the raycasted body
     * @return CANNON.Body
     */
    applyLocalForceToRayBody( forceScale ) {
        return this.applyForceImpulseWorldLocal(forceScale, 1);
    }

    /**
     * Apply impulse to raycased rigid body
     * @param {number} impulseScale impulse scale to be applied to the raycasted body
     * @return CANNON.Body
     */
    applyImpulseToRayBody( impulseScale ) {
        return this.applyForceImpulseWorldLocal(impulseScale, 2);
    }

    /**
     * Apply local impulse to raycased rigid body
     * @param {number} impulseScale impulse scale to be applied to the raycasted body
     * @return CANNON.Body
     */
    applyLocalImpulseToRayBody( impulseScale ) {
        return this.applyForceImpulseWorldLocal(impulseScale, 3);
    }



    /**********************************************************************************************************/
    /*       Camera       Camera        Camera        Camera        Camera        Camera        Camera        */
    /**********************************************************************************************************/

    /**
     * Returns the main camera object
     * @return THREE.Camera
     */
    getCamera() {
        return this.core.graphics.camera;
    }


    /**********************************************************************************************************/
    /* Controls       Controls        Controls        Controls        Controls        Controls       Controls */
    /**********************************************************************************************************/
    
    /**
     * Returns current used controls
     * @return THREE.Controls
     */
    getControls() {
        return this.core.graphics.controls;
    }

    /**
     * Enables/Disables controls
     * @return THREE.Controls
     */
    setControlsEnabled( enabled ) {
        this.core.graphics.controls.enabled = enabled;   
        return this.core.graphics.controls;
    }

     /**
     * Set damping factor of controls
     * @return THREE.Controls
     */
    setControlsDamping( damping ) {
        this.core.graphics.controls.damping = damping;
        return this.core.graphics.controls;
    }
    

    /**********************************************************************************************************/
    /*    Light       Light        Light        Light        Light        Light        Light        Light     */
    /**********************************************************************************************************/

    /**
     * Returns array of ambient lights lights
     * @return THREE.AmbientLight
     */
    getAmbientLights() {
        return this.core.graphics.ambientLights;
    }

    /**
     * Returns array of point lights
     * @return THREE.PointLight
     */
    getPointLights() {
        return this.core.graphics.pointLights;
    }

    /**
     * Returns array of spot lights
     * @return THREE.SpotLight
     */
    getSpotLights() {
        return this.core.graphics.spotLights;
    }

     /**
     * Returns array of directional lights
     * @return THREE.DirectionalLight
     */
    getDirectionalLights() {
        return this.core.graphics.directionalLights;
    }

    /**
     * Set color of the target light
     * @param {THREE.Light} light target light
     * @param {THREE.Color} color color, THREE.Color or HEX color 
     * @return THREE.Color 
     */
    setLightColor( light, color ) {
        light.color = new Engine.Color( color );
        return light.color;
    }

    /**
     * Set light visibility
     * @param {THREE.Light} light target light
     * @param {boolean} visible   true: visible, false: invisible
     * @return the garget light
     */
    setLightVisible( light, visible ) {
        light.visible = visible;
        return light;
    }

    /**
     * Set light intensity
     * @param {THREE.Light} light target light
     * @param {number} intensity  intensity of light
     * @return the garget light
     */
    setLightIntensity( light, intensity ) {
        light.intensity = intensity;
        return light;
    }



    /**********************************************************************************************************/
    /*       Print      Print       Print       Print       Print       Print       Print       Print         */
    /**********************************************************************************************************/

    /**
     * Print message to console window
     * @param {string} message      message to be printed to console window
     * @param {string} typeOrColor  message type or message color code
     * @return Utils object
     */
    print( message, typeOrColor ) {
        return Utils.print( message, typeOrColor );
    }

    /**
     * Print info-message to console window
     * @param {string} message message to be printed to console window
     * @return Utils object
     */
    printInfo( message ) {
        return Utils.printInfo( message );
    }

    /**
     * Print success-message to console window
     * @param {string} message message to be printed to console window
     * @return Utils object
     */
    printSuccess( message ) {
        return Utils.printSuccess( message );
    }

    /**
     * Print warning-message to console window
     * @param {string} message message to be printed to console window
     * @return Utils object
     */
    printWarning( message ) {
        return Utils.printWarning( message );
    }

    /**
     * Print danger-message to console window
     * @param {string} message message to be printed to console window
     * @return Utils object
     */
    printDanger( message ) {
        return Utils.printDanger( message );
    }

    /**
     * Print primary-message to console window
     * @param {string} message message to be printed to console window
     * @return Utils object
     */
    printPrimary( message ) {
        return Utils.printPrimary( message );
    }


    /**********************************************************************************************************/
    /*       Label      Label       Label       Label       Label       Label       Label       Label         */
    /**********************************************************************************************************/
    /**
     * Adds label to the mesh
     * @param {THREE.Mesh} mesh  target mesh 
     * @param {string}     label label/text to be displayed on the mesh
     * @return CSS2DObject label
     */
    addMeshLabel( mesh, label ) {
        return this.core.graphics.labelRenderer.addMeshLabel( mesh, label );
    }

    /**
     * Changes css class name of the label
     * @param {THREE.Mesh} mesh  target mesh 
     * @param {string} className css class name
     * @return CSS2DObject label
     */
    setMeshLabelClass( mesh, className ) {
        return this.core.graphics.labelRenderer.setMeshLabelClass( mesh, className );
    }

    /**
     * Adds css class name into css classList of the label element
     * @param {HREE.Mesh} mesh   target mesh 
     * @param {string} className css class name
     * @return CSS2DObject label
     */
    addMeshLabelClass( mesh, className ) {
        return this.core.graphics.labelRenderer.addMeshLabelClass( mesh, className );
    }

    /**
     * Returns label of the provided mesh
     * @param {THREE.Mesh} mesh target mesh
     * @return CSS2DObject label
     */
    getMeshLabel( mesh ) {
        return this.core.graphics.labelRenderer.getMeshLabel( mesh );
    }

    /**
     * Updates label of the provided mesh
     * @param {THREE.Mesh} mesh  target mesh
     * @param {string}     label label/text to be displayed on the mesh
     * @return CSS2DObject label
     */
    updateMeshLabel( mesh, label ) {
        return this.core.graphics.labelRenderer.updateMeshLabel( mesh, label );
    }

    /**
     * Sets label position relative to the target mesh
     * @param {THREE.Mesh}    mesh     target mesh
     * @param {THREE.Vector3} position label position
     * @return CSS2DObject label
     */
    setMeshLabelPosition(mesh, position) {
        return this.core.graphics.labelRenderer.setMeshLabelPosition( mesh, position );
    }

    /**
     * Add labels to meshes in the current scene
     * @return THREE.Mesh[ ]
     */
    addMeshLabelToMeshes() {
        return this.core.graphics.labelRenderer.addMeshLabelToMeshes( );
    }

    /**
     * Removes all labels from meshes in the current scene
     * @return THREE.Mesh[ ]
     */
    removeMeshLabel( mesh ) {
        return this.core.graphics.labelRenderer.removeMeshLabel( mesh );   
    }

    /**
     * Removes all labels from meshes in the current scene
     * @return THREE.Mesh[ ]
     */
    removeMeshLabelFromMeshes() {
        return this.core.graphics.labelRenderer.removeMeshLabelFromMeshes();   
    }

    /**********************************************************************************************************/
    /*  Asset Loader      AssetLoader       AssetLoader       AssetLoader       AssetLoader       AssetLoader */
    /**********************************************************************************************************/
    
    /**
     * Load asset, the special model. This model includes actor/character and colliders
     * @param {string} model GLTF file name
     * @param {*} callback   callback function
     * @return Promise
     */
    loadAssets( model, callback ) {
        this.core.assetLoader.load( model, callback);
    }
}
